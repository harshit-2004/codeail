const express = require('express');

const passport = require('passport');

const router = express.Router();

const CommentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthentication,CommentController.create);

router.get('/destroy/:id',passport.checkAuthentication,CommentController.destroy);

module.exports = router;