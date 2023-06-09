const express = require('express');

const passport = require('passport');

const router = express.Router();

const CommentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,CommentController.create);

module.exports = router;