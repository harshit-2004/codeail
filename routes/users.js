const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/users_controller');

router.get("/profile",userContoller.profile);

module.exports= router;