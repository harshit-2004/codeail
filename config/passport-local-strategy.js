const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require("../models/user");

//      authentication using passport 
passport.use(new LocalStrategy({
    usernameField: 'email'
},
async function(email,password,done) {
    try {
        const user = await User.findOne({email:email});
        
        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }
        else
        return done(null, user);
    } catch (err) {
        console.log('Error in finding user --> Passport',err);
        return done(err);
    }
    // find a user and establish the identity
}));

//      serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    // done(null,user.id);
    process.nextTick(function() {
        return done(null, user.id);
      });
})

//      deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
            return done(null, user);
        }).catch(function(err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        });
});


passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function (controller's action)
    if (req.isAuthenticated()){
        return next ();
    }else{
        //  if the user is not signed in 
        return res.redirect('/users/signin');
    }
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;