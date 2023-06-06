const express = require('express');

const cookieParser = require('cookie-parser');

const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');

const app = express();

const port = "8000";

const db = require('./config/mongoose');

const session = require('express-session');

const passport = require('passport');

const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());

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
    },function(err){
        console.log("show error"+err||"connect mongodb setup ok");
    })
}))

app.use(passport.initialize());

app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//              Use express router 
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running the port ${port}`);
})