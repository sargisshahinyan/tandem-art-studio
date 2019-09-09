const express = require('express');
const router = express.Router();

const PagesSvc = require(`${APP_PATH}/services/PagesSvc`);

router.get('/', async (req, res, next) => {
  try {
    const pages = await PagesSvc.getPagesData();

    res.json(pages);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
