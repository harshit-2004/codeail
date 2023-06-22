const express = require('express');

const cookieParser = require('cookie-parser');

const env = require('./config/environment');

const logger = require('morgan');

const app = express();

require('./config/view-helper')(app);

const port = "8000";

const path = require('path');

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');

const passportJwt = require('./config/passport-jwt');

const passportGoogle = require('./config/passport-google-auth20-strategy');

const nodemailer = require('nodemailer');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');

const flash = require('connect-flash');

const customMware = require('./config/middleware');

const { connect } = require('mongoose');

const chatServer = require('http').Server(app);

const chatSockets = require('./config/chat_socket').chatSockets(chatServer);

const socketPort = 3000;
chatServer.listen(socketPort, function(err) {
  if (err) {
    console.log("error in listening port in 5", err);
  }
  console.log("socket is listening on port", socketPort);
});

app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

if(env.name=='development'){
    app.use(sassMiddleware({
        src: path.join(__dirname,env.assets_path,'scss'),
        dest: path.join(__dirname,env.assets_path,'css'),
        debug:false,
        outputStyle:'expanded',
        prefix:'/css'
    }));
}


app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret:env.session_cookie_key,
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

app.use(express.static(env.assets_path));

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