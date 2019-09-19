const express = require('express');
const router = express.Router();

const UsersSvc = require(`${APP_PATH}/services/UsersSvc`);

router.post('/auth', (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
