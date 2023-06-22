const passport = require('passport');

const JWTStrategy = require('passport-jwt').Strategy;

const EXTRACTJWT = require('passport-jwt').ExtractJwt;

const env = require('./environment');

const User = require('../models/user');

let opts = {
    jwtFromRequest : EXTRACTJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.jwt_secret_key
}

passport.use(new JWTStrategy(opts, async function(jwtPayLoad,done){
    try {
        let user = await User.findById(jwtPayLoad._id);
      
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        console.log("Error in finding user for jwt ", err);
        return;
      }
}))

module.exports = passport;