const express = require('express');
const path = require('path');
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
  HOME_SLIDE_PATH,
  TEAM_PATH,
  SERVICES_PATH,
  CLIENTS_PATH,
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
  res.locals.NAV_TABS = NAV_TABS.map((tab) => ({
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

router.post('/home', async (req, res, next) => {
  try {
    let { slidePaths } = req.body;
    const { page: { slidePaths: currentImages } } = res.locals;

    currentImages.forEach(({ main, text }) => {
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(main),
        ),
      );
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(text),
        ),
      );
    });

    slidePaths = await Promise.all(
      slidePaths.map(async ({ main, text }) => {
        ([main, text] = await Promise.all([
          ImagesSvc.createPhoto(main, HOME_SLIDE_PATH + randToken.generate(16), STATIC_FILES_DIRECTORY),
          text && ImagesSvc.createPhoto(text, HOME_SLIDE_PATH + randToken.generate(16), STATIC_FILES_DIRECTORY),
        ]));

        return { main, text };
      })
    );

    req.body.slidePaths = slidePaths;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/team', async (req, res, next) => {
  try {
    let { members } = req.body;
    const { page: { members: currentMembers } } = res.locals;

    currentMembers.forEach(({ avatar }) => {
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(avatar),
        ),
      );
    });

    members = await Promise.all(
      members.map(async (member) => ({
        ...member,
        avatar: await ImagesSvc.createPhoto(member.avatar, TEAM_PATH + randToken.generate(16), STATIC_FILES_DIRECTORY),
      }))
    );

    req.body.members = members;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/services', async (req, res, next) => {
  try {
    let { services } = req.body;
    const { page: { services: currentServices } } = res.locals;

    currentServices.forEach(({ icon }) => {
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(icon),
        ),
      );
    });

    services = await Promise.all(
      services.map(async (service) => ({
        ...service,
        icon: await ImagesSvc.createPhoto(service.icon, SERVICES_PATH + randToken.generate(16), STATIC_FILES_DIRECTORY),
      }))
    );

    req.body.services = services;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/clients', async (req, res, next) => {
  try {
    let { clients } = req.body;
    const { page: { clients: currentClients } } = res.locals;

    currentClients.forEach(({ icon }) => {
      ImagesSvc.deletePhoto(
        path.join(
          APP_PATH,
          path.resolve(STATIC_FILES_DIRECTORY),
          path.resolve(icon),
        ),
      );
    });

    clients = await Promise.all(
      clients.map(async (service) => ({
        ...service,
        icon: await ImagesSvc.createPhoto(service.icon, CLIENTS_PATH + randToken.generate(16), STATIC_FILES_DIRECTORY),
      }))
    );

    req.body.clients = clients;
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post(/\/(home|about|team|services|clients)/, async (req, res, next) => {
  try {
    await PagesSvc.updatePageData(req.path, req.body);
    res.redirect(req.originalUrl);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/settings', async (req, res, next) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    let isCorrectPassword;
    try {
      isCorrectPassword = await UsersSvc.checkPassword(res.locals.userId, currentPassword);
    } catch (e) {
      next(e);
    }

    if (!isCorrectPassword) {
      return res.render('admin/main', {
        error: {
          message: 'Incorrect password',
        },
      });
    }

    if (newPassword !== confirmPassword) {
      return res.render('admin/main', {
        error: {
          message: 'Passwords do not match',
        },
      });
    }

    await UsersSvc.changePassword(res.locals.userId, newPassword);

    res.redirect(req.originalUrl);
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

router.put('/portfolio/order', async (req, res, next) => {
  try {
    const { portfolios } = req.body;
    await PortfolioSvc.changeOrder(portfolios);
    res.status(204).send();
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
    sections,
  } = req.body;

  const mainPictureName = randToken.generate(16);
  mainPicture = await ImagesSvc.createPhoto(mainPicture, PORTFOLIO_IMAGES_PATH + mainPictureName, STATIC_FILES_DIRECTORY);
  const presentablePictureName = randToken.generate(16);
  presentablePicture = await ImagesSvc.createPhoto(presentablePicture, PORTFOLIO_IMAGES_PATH + presentablePictureName, STATIC_FILES_DIRECTORY);

  sections = Array.isArray(sections) ? sections : [];
  sections = await Promise.all(
    sections.map(async ({ colsCount, images }) => ({
      colsCount,
      images: Array.isArray(images) ? (
        await Promise.all(
          images.map(async (image) => {
            const imageName = randToken.generate(16);

            return {
              src: await ImagesSvc.createPhoto(image, PORTFOLIO_IMAGES_PATH + imageName, STATIC_FILES_DIRECTORY),
            };
          })
        )
      ) : [],
    }))
  );

  await PortfolioSvc.addPortfolio({
    title,
    description,
    presentablePicture,
    mainPicture,
    sections,
  }, id);
}

module.exports = router;
