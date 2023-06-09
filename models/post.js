const mongoose = require('mongoose');

const postSchemas = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // array of comments in post
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
})

const Post = mongoose.model('Post',postSchemas);
module.exports = Post; 