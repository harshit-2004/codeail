const passport = require('passport');

const env = require('./environment');

const googleStrategy = require('passport-google-oauth20').Strategy;

const crypto = require('crypto');

const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:env.google_client_ID,
        clientSecret:env.google_client_Secret,
        callbackURL:env.google_call_back_URL
    },
    async function(accessToken,refreshToken,profile,done){
        try{
            let user = await User.findOne({email:profile.emails[0].value});
            console.log("accesstoken",accessToken);
            console.log("refereshtoken",refreshToken);
            console.log("profile",profile);
            if(user){
                return done(null,user);
            }else{
                let us = await User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                })
                return done(null,us);
            }
        }catch(err){
            console.log(err,"Error in finding the user");
            return ;
        }
    }
// async function(accessToken, refreshToken, profile, done) {
//   try {
//     // Find a user
//     const user = await User.findOne({ email: profile.emails[0].value });

//     console.log(accessToken, refreshToken);
//     console.log(profile);

//     if (user) {
//       // If found, set this user as req.user
//       return done(null, user);
//     } else {
//       // If not found, create the user and set it as req.user
//       const newUser = await User.create({
//         name: profile.displayName,
//         email: profile.emails[0].value,
//         password: crypto.randomBytes(20).toString('hex')
//       });

//       return done(null, newUser);
//     }
//   } catch (err) {
//     console.log('Error in Google strategy-passport', err);
//     return done(err);
//   }
// }

))

module.exports = passport;