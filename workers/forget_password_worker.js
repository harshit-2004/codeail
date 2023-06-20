const queue = require('../config/kue');

const forgetPasswordMailer = require('../mailers/forgetPassword_mailer');

queue.process('forgetPassword',function(job,done){
    // console.log("email worker is processing a job ",job);
    forgetPasswordMailer.forget(job.data);
    done();
})