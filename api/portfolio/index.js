const express = require('express');
const router = express.Router();

const PortfolioSvc = require(`${APP_PATH}/services/PortfolioSvc`);

router.get('/', async (req, res, next) => {
  try {
    const portfolios = await PortfolioSvc.getPortfolios();

    res.json(portfolios);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
