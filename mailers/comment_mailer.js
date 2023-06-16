const nodemailer = require('../config/nodemailer');

exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({
        comment:comment
    },'/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:"harshit.sharma89501@gmail.com",
        to:comment.user.email,
        subject:"new comment publish of yours ",
        html:htmlString
    },function(err,info){
        if(err){console.log("error in sendign mail",err);return;}
        console.log("message sent ",info);
        return ;
    })
}