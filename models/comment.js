const mongoose = require('mongoose');

const commentSchemas = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belong to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // from which post the comment is made
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},{
    timestamps:true
})

const Comment = mongoose.model('Comment',commentSchemas);

module.exports = Comment;