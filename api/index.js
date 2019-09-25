const express = require('express');
const router = express.Router();

const routes = ['/pages', '/portfolio'];

routes.forEach(route => router.use(route, require(`.${route}`)));

module.exports = router;
