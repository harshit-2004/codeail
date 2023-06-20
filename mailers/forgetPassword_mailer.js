const nodemailer = require('../config/nodemailer');
const path = require('path');
exports.forget = (us)=>{
    // console.log(us,"giving the details of us");
    let htmlString = nodemailer.renderTemplate({
        data:us
        // ,
        // url:path.join('http://localhost:8000/')
    },'/forget_password_mailers.ejs')
    // console.log("giving the log of ",us);
    nodemailer.transporter.sendMail({
        from:"harshit.sharma89501@gmail.com",
        to:us.user.email,
        subject:"Forget Password Token",
        html:htmlString
    },function(err,info){
        if(err){console.log("error in sendign mail",err);return;}
        console.log("message sent ",info);
        return ;
    })
}