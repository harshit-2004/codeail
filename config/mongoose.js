const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/authenticated_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open',function(){
    console.log("successfully connected to Mongodb");
})

module.exports = db;