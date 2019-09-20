const express = require('express');
const router = express.Router();

const UsersSvc = require(`${APP_PATH}/services/UsersSvc`);
const PagesSvc = require(`${APP_PATH}/services/PagesSvc`);

const { TOKEN_EXPIRATION_TIME, TOKEN_COOKIE_KEY, NAV_TABS } = require(`${APP_PATH}/constants`);

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

    res.redirect(req.baseUrl + '/home')
  } catch (error) {
    res.render('admin/login', { error });
  }
});

router.use(authCheckingMiddleware);

router.use(async (req, res, next) => {
  res.locals.NAV_TABS = NAV_TABS.map(tab => ({
    ...tab,
    path: `${req.baseUrl}${tab.path}`,
  }));
  res.locals.activePath = req.originalUrl;
  res.locals.pages = await PagesSvc.getPagesData();

  next();
});

router.get(new RegExp(`/(${NAV_TABS.map(tab => tab.path).join('|')})`), (req, res) => {
  res.render('admin/main');
});

router.get('*', (req, res) => {
  res.redirect(`${req.baseUrl}/login`);
});

module.exports = router;
