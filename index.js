const express = require('express');

const cookieParser = require('cookie-parser');

const app = express();

const port = "8000";

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');

const passportJwt = require('./config/passport-jwt');

const passportGoogle = require('./config/passport-google-auth20-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const customMware = require('./config/middleware');

const { connect } = require('mongoose');

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.use(sassMiddleware({
    src: __dirname + '/assets/scss',
    dest: __dirname + '/assets/css',
    debug:false,
    outputStyle:'expanded',
    prefix:'/css'
}));

app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//              Set up our view engine
app.set('view engine','ejs');
app.set('views','./views');

        // mongo store the session cookie in mongo
app.use(session({
    name:'Harshitcookie',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000 * 60 * 100)
    // }
    },
    store: MongoStore.create({
        mongoUrl :"mongodb://localhost:27017/mydatabase",
        autoRemove:'disabled'
    })
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(flash());

app.use(customMware.setFlash);

app.use(passport.setAuthenticatedUser);

app.use(express.static('assets'))

// Make the path available to browser
app.use('/uploads',express.static(__dirname+'/uploads')); 

//              Use express router 
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running the port ${port}`);
})