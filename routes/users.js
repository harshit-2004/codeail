const express = require('express');

const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get("/profile/:id",passport.checkAuthentication,userController.profile);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post("/create",userController.create);

//  Use passport as a middle ware
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/users/signin',successRedirect:'/'},), userController.createSession);

router.get('/signout',userController.destroySession);

module.exports= router;