const express = require('express');

const router = express.Router();

const public_user = require("../controllers/public_user_controller");

router.get('/users',public_user.public);

module.exports = router;