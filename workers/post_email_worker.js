const queue = require('../config/kue');

const postEmailer = require('../mailers/post_mailer');

queue.process('postemails',function(job,done){
    // console.log("email worker is processing a job ",job);
    postEmailer.newPost(job.data);
    done();
})