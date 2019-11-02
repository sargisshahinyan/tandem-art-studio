const express = require('express');
const router = express.Router();
const randToken = require('rand-token');

const UsersSvc = require(`${APP_PATH}/services/UsersSvc`);
const PagesSvc = require(`${APP_PATH}/services/PagesSvc`);
const PortfolioSvc = require(`${APP_PATH}/services/PortfolioSvc`);
const ImagesSvc = require(`${APP_PATH}/services/ImagesSvc`);

const {
  TOKEN_EXPIRATION_TIME,
  TOKEN_COOKIE_KEY,
  NAV_TABS,
  PORTFOLIO_IMAGES_PATH,
  STATIC_FILES_DIRECTORY,
} = require(`${APP_PATH}/constants`);

const authCheckingMiddleware = require(`${APP_PATH}/middlewares/authCheckingMiddleware`);

router.get('/login', (req, res) => {
  const { token } = req.cookies;

  if (token) return res.redirect(`${req.baseUrl}/home`);

  res.render('admin/login');
});

router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await UsersSvc.authAdmin({ username, password });
    const token = await UsersSvc.generateAdminToken(user);

    res.cookie(TOKEN_COOKIE_KEY, token, {
      maxAge: TOKEN_EXPIRATION_TIME,
    });

    res.redirect(`${req.baseUrl}/home`);
  } catch (error) {
    res.render('admin/login', { error });
  }
});

router.use(authCheckingMiddleware);

router.use(async (req, res, next) => {
  res.locals.NAV_TABS = NAV_TABS.map(tab => ({
    ...tab,
    path: `${req.baseUrl}/${tab.path}`,
  }));
  res.locals.activePath = req.originalUrl;
  res.locals.activePage = req.path;
  res.locals.baseUrl = req.baseUrl;
  const pages = await PagesSvc.getPagesData(req.path);

  if (pages && pages.length) res.locals.page = pages[0].data;

  next();
});

router.use('/logout', async (req, res) => {
  const { token } = req.cookies;
  const result = await UsersSvc.validateAdmin(token);

  const { iss: id, access_token, refresh_token } = result;
  await UsersSvc.removeTokens(id, access_token, refresh_token);
  res.clearCookie(TOKEN_COOKIE_KEY);
  res.redirect(`${req.baseUrl}/login`);
});

router.get('/portfolio', async (req, res, next) => {
  try {
    res.locals.portfolios = await PortfolioSvc.getPortfolios();
    next();
  } catch (e) {
    next(e);
  }
});

router.get('/portfolio/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    res.locals.portfolio = await PortfolioSvc.getPortfolio(id);
    next();
  } catch (e) {
    next(e);
  }
});

router.get(new RegExp(`\/(${NAV_TABS.map(tab => tab.path).join('|')})`), (req, res) => {
  res.render('admin/main');
});

router.post(/\/(about|team|services|clients)/, async (req, res) => {
  try {
    await PagesSvc.updatePageData(req.path, req.body);
    res.redirect(req.originalUrl);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.put('/portfolio', async (req, res) => {
  try {
    await PagesSvc.updatePageData(req.path, req.body);
    res.json(req.body);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/portfolio', async (req, res, next) => {
  try {
    await addPortfolio(req);
    res.status(201).json({
      message: 'Ok',
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/portfolio/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    await PortfolioSvc.deletePortfolio(id);

    res.status(204).send();
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.put('/portfolio/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await PortfolioSvc.deletePortfolio(id);
    await addPortfolio(req, id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
});

router.get('*', (req, res) => {
  res.redirect(`${req.baseUrl}/login`);
});

async function addPortfolio(req, id = null) {
  let {
    title,
    description,
    presentablePicture,
    mainPicture,
    xCoords,
    yCoords,
    rowsCount,
    columnsCount,
    rowHeight,
    images,
  } = req.body;

  const mainPictureName = randToken.generate(16);
  mainPicture = await ImagesSvc.createPhoto(mainPicture, PORTFOLIO_IMAGES_PATH + mainPictureName, STATIC_FILES_DIRECTORY);
  const presentablePictureName = randToken.generate(16);
  presentablePicture = await ImagesSvc.createPhoto(presentablePicture, PORTFOLIO_IMAGES_PATH + presentablePictureName, STATIC_FILES_DIRECTORY);

  images = Array.isArray(images) ? images : [];
  images = await Promise.all(
    images.map(async ({ image, coords }) => {
      const imageName = randToken.generate(16);

      return {
        coords,
        src: await ImagesSvc.createPhoto(image, PORTFOLIO_IMAGES_PATH + imageName, STATIC_FILES_DIRECTORY),
      };
    })
  );

  await PortfolioSvc.addPortfolio({
    title,
    description,
    presentablePicture,
    mainPicture,
    xCoords,
    yCoords,
    rowsCount,
    columnsCount,
    rowHeight,
    images,
  }, id);
}

module.exports = router;
