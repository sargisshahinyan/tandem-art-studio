const express = require('express');
const { renderReactPage } = require(`${APP_PATH}/utils`);

const PagesSvc = require('../services/PagesSvc');
const PortfolioSvc = require('../services/PortfolioSvc');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const pagesData = await PagesSvc.getPagesData();

    const content = await renderReactPage({
      pages: pagesData,
    });
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send('An error occurred');
  }
});

router.get('/portfolio', async (req, res) => {
  try {
    const [pagesData, portfolios] = await Promise.all([
      PagesSvc.getPagesData(),
      PortfolioSvc.getPortfolios(),
    ]);

    const content = await renderReactPage({
      pages: pagesData,
      portfolios,
    });
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
