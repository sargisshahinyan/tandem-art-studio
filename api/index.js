const express = require('express');
const router = express.Router();

const routes = ['/pages'];

routes.forEach(route => router.use(route, require(`.${route}`)));

module.exports = router;
