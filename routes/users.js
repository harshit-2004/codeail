const express = require('express');

const router = express.Router();

const userContoller = require('../controllers/users_controller');

router.get('/signin',userContoller.signin);

router.get('/signup',userContoller.signup);

router.get("/profile",userContoller.profile);

router.post("/create",userContoller.create);

router.post("/createSession",userContoller.createSession);

module.exports= router;