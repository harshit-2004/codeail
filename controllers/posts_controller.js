const passport = require('passport');

const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.feed = async function(req,res){
    try{
      const newpost = await Post.create({
        content:req.body.content,
        user:req.user._id
      })
      console.log("inside the creating feed " +req.xhr);
      if(req.xhr){
        return res.status(200).json({
          data:{
            post:newpost
          },
          message:"Post Created Successful"
        });

      }
      return res.redirect('back');
  
    }catch(err)
    {
      console.log(`Error find then see it ${err}`);
    }
}

module.exports.destroy = async function(req, res) {
  try {
    const post = await Post.findById(req.params.id);

    console.log("inside the destroy " +req.xhr);

    if (post.user == req.user.id) {
      await Post.findByIdAndDelete(post._id);
      await Comment.deleteMany({ post: req.params.id });
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"Post Deleted Succesfull"
        })
      }
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    console.error(err);
    return res.redirect('back');
  }
};

