const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req);
  res.redirect('/tas-admin/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
