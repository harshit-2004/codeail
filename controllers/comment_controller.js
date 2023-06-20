const passport = require('passport');

const Post = require('../models/post');

const Comment = require('../models/comment');

const commentMailer = require('../mailers/comment_mailer');

const commentEmailWorker = require('../workers/comment_emai_worker');

const queue = require('../config/kue');

const Like= require('../models/like');

module.exports.create = async function(req,res){
    try{
        const postfound = await Post.findById(req.body.post_value);
        // console.log("postfound ",postfound);
        if(postfound)
        {
            let newcomment = await Comment.create({
              content:req.body.content,
              post:req.body.post_value,
              user:req.user._id
            })
            let username = req.user.name;
            postfound.comments.push(newcomment);
            postfound.save();
            newcomment = await newcomment.populate('user', 'name email');


            // commentMailer.newComment(newcomment);


            let job = queue.create('emails',newcomment).save(function(err){
              if(err){console.log("error in saving email queue ",err);}
              console.log("job id ",job.id);
            });
            console.log("newcomment ",newcomment);
            if(req.xhr){
              return res.status(200).json({
                data:{
                  comment:newcomment,
                  username:username
                },
                message:"Comment Created Successful"
              });
            }
          }
            return res.redirect('back');
      }catch(err)
      {
        console.log(`Error find then see it ${err}`);
      }
}

module.exports.destroy = async function(req,res){
  const comm = await Comment.findById(req.params.id);

  // console.log("deleted ",comm);
  if(req.user.id==comm.user)
  {
    const post_id = comm.post;
    await Post.updateOne(
      { _id: post_id }, // Use "_id" for searching by document ID
      { $pull: { comments: comm._id } } // Specify the field as an array and provide the comment ID to remove
    );

    await Like.deleteMany({likeable:comm._id,onModel:'Comment'});
    
    await Comment.findByIdAndDelete(comm._id);
    
    if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id
        },
        message:"Post Deleted Succesfull"
      })
    }
    return res.redirect('back');
  }else{
    return res.redirect('back');
  }
}