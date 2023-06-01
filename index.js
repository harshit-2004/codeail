const express = require('express');

const app = express();

const port = "8000";

//              Use express router 
app.use('/',require('./routes'));

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