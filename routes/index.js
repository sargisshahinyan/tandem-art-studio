const express = require('express');
const { renderReactPage } = require(`${APP_PATH}/utils`);

const PagesSvc = require('../services/PagesSvc');
const PortfolioSvc = require('../services/PortfolioSvc');

const router = express.Router();

router.get('*', async (req, res) => {
  try {
    const dataRequests = [{
      key: 'pages',
      value: PagesSvc.getPagesData(),
    }];

    if (req.originalUrl === '/portfolio') {
      dataRequests.push({
        key: 'portfolios',
        value: PortfolioSvc.getPortfolios(),
      });
    } else if (/^\/portfolio\/\d+$/.test(req.originalUrl)) {
      dataRequests.push({
        key: 'selectedPortfolio',
        value: PortfolioSvc.getPortfolio(req.originalUrl.match(/\d+/)[0]),
      });
    }

    await Promise.all(dataRequests.map(req => req.value));

    const props = await dataRequests.reduce(async (props, { key, value }) => {
      if (props instanceof Promise) props = await props;

      props[key] = await value;
      return props;
    }, {});

    const content = await renderReactPage(props, req.originalUrl);
    res.send(content);
  } catch (e) {
    console.error(e);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
