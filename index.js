const express = require('express');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');

const app = express();

const port = "8000";

const db = require('./config/mongoose');

app.use(express.urlencoded());

//              Use express router 
app.use('/',require('./routes'));


app.use(cookieParser());

//              Set up our view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running the port ${port}`);
})