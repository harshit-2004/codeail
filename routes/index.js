const express = require('express');
const home_contoller = require('../controllers/home_controller');

const router = express.Router();

console.log("router loaded ");

router.get('/',home_contoller.home);

router.use('/posts',require('./posts'));

router.use('/users',require('./users'));

router.use('/public',require('./public_user'));

router.use('/comment',require('./comments'));

router.use('/api',require('./api'));

module.exports = router;