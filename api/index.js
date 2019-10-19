const express = require('express');
const router = express.Router();

const routes = ['/pages', '/portfolios', '/emails'];

routes.forEach(route => router.use(route, require(`.${route}`)));

module.exports = router;
