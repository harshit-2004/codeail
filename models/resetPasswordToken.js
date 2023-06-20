const mongoose = require('mongoose');

const rPT= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    isvalid:{
        type:Boolean,
        required:true
    }
},{
    timestamps:true
})

const ResetPasswordToken = mongoose.model('ResetPasswordToken',rPT);

module.exports = ResetPasswordToken;