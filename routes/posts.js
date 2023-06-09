const express = require('express');

const passport = require('passport');

const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/feed',passport.checkAuthentication,postController.feed);

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports= router;