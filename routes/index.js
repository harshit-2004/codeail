const express = require('express');
const home_contoller = require('../controllers/home_controller');

const router = express.Router();

console.log("router loaded ");

router.get('/',home_contoller.home);

module.exports = router;