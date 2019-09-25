const express = require('express');
const router = express.Router();

const PagesSvc = require(`${APP_PATH}/services/PagesSvc`);

router.get('/', async (req, res, next) => {
  try {
    const portfolios = await PagesSvc.getPortfolios();

    res.json(portfolios);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
