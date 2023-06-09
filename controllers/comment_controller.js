const passport = require('passport');

const Post = require('../models/post');

const Comment = require('../models/comment');

module.exports.create = async function(req,res){
    try{
        const postfound = await Post.findById(req.body.post_value);
        if(postfound)
        {
            const newcomment = await Comment.create({
              content:req.body.content,
              post:req.body.post_value,
              user:req.user._id
            })
            postfound.comments.push(newcomment);
            postfound.save();
            return res.redirect('back');
        }
      }catch(err)
      {
        console.log(`Error find then see it ${err}`);
      }
}