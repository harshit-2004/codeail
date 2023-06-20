const passport = require('passport');

const Comment = require('../models/comment');

const Post = require('../models/post');

const PostMailer = require('../mailers/post_mailer');

const postEmailWorker = require('../workers/post_email_worker');

const queue = require('../config/kue');

const Like= require('../models/like');

module.exports.feed = async function(req,res){
    try{
      let newpost = await Post.create({
        content:req.body.content,
        user:req.user._id
      })
      newpost = await newpost.populate('user', 'name email');
      let job = queue.create('postemails',newpost).save(function(err){
        if(err){console.log("error in saving email queue ",err);}
        console.log("job id ",job.id);
      });
      console.log("inside the creating feed " +req.xhr);
      let username = req.user.name;
      if(req.xhr){
        return res.status(200).json({
          data:{
            post:newpost,
            username:username
          },
          message:"Post Created Successful"
        });
      }
      req.flash('success', 'Post published!');
      return res.redirect('back');
  
    }catch(err)
    {
      req.flash('error', err);
      console.log(`Error find then see it ${err}`);
    }
}

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    console.log("inside the destroy " +req.xhr);
    if (post.user == req.user.id) {
      await Like.deleteMany({likeable:post,onModel:'Post'});
      await Like.deleteMany({_id:{$in:post.comments}});
      await Comment.deleteMany({ post: req.params.id });
      await Post.findByIdAndDelete(post._id);
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"Post Deleted Succesfull"
        })
      }
      req.flash('success', 'Post Deleted !');
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};