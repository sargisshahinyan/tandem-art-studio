const express = require('express');
const router = express.Router();

router.use('/login', (req, res) => {
  res.render('login');
});

router.use('/', (req, res) => {
  res.redirect('/admin/login');
});

module.exports = router;
