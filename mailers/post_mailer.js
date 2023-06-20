const nodemailer = require('../config/nodemailer');

exports.newPost = (post)=>{
    let htmlString = nodemailer.renderTemplate({
        post:post
    },'/posts/new_post.ejs')
    nodemailer.transporter.sendMail({
        from:"harshit.sharma89501@gmail.com",
        to:post.user.email,
        subject:"new Post publish of yours ",
        html:htmlString
    },function(err,info){
        if(err){console.log("error in sendign mail",err);return;}
        console.log("message sent ",info);
        return ;
    })
}