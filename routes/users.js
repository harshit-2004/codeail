const express = require('express');

const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get("/profile/:id",passport.checkAuthentication,userController.profile);

router.post("/update/:id",passport.checkAuthentication,userController.update);

router.get('/signup',userController.signup);

router.get('/signin',userController.signin);

router.post("/create",userController.create);

//  Use passport as a middle ware
router.post('/create-session', passport.authenticate('local',{failureRedirect: '/users/signin',failureMessage:true}), userController.createSession);

router.get('/signout',userController.destroySession);

// router.get('/auth/google',passport.authenticate('google',{
//     scope:['profile','email']
// }));

// router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createSession);

router.get ('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get ('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/signin',failureMessage:true}), userController.createSession);

router.post('/forget',userController.forget);

router.get('/forgetPasswordPage',userController.forgetPasswordPage);

router.get('/reset-password/:accessToken',userController.resetPassword);

router.post('/resetPasswordCall/:accessToken',userController.resetPasswordCall);

module.exports= router;