const UsersSvc = require(`${APP_PATH}/services/UsersSvc`);

const { TOKEN_EXPIRATION_TIME, TOKEN_COOKIE_KEY } = require(`${APP_PATH}/constants`);

module.exports = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.redirect(`${req.baseUrl}/login`);
    }

    const result = await UsersSvc.validateAdmin(token);

    if (new Date(result.access_token.expDate) < Date.now()) {
      const { iss: id, access_token, refresh_token } = result;
      const token = await UsersSvc.updateTokens(id, access_token, refresh_token);
      res.cookie(TOKEN_COOKIE_KEY, token, {
        maxAge: TOKEN_EXPIRATION_TIME,
      });
    }

    res.locals.userId = result.iss;

    next();
  } catch (e) {
    res.clearCookie(TOKEN_COOKIE_KEY);
    res.redirect(`${req.baseUrl}/login`);
  }
};
