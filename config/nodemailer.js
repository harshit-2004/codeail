const nodemailer = require('nodemailer');

const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:'harshit.sharma89501@gmail.com',
        pass:'lctiasbrvjawcxbv'
    }
})

let renderTemplate = (data,relativePath)=>{
    let mailHTML ;  
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,Template){
            if(err){console.log(err,"error in rendering to mailer");return ;}
            mailHTML = Template;
        }
    )
    return mailHTML;
}

module.exports = {
    transporter:transporter,
    renderTemplate:renderTemplate
}