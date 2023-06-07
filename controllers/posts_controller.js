const passport = require('passport');

const Post = require('../models/post');

module.exports.feed = async function(req,res){
    try{
      const newpost = await Post.create({
        content:req.body.content,
        user:req.user._id
      })
      return res.redirect('back');
  
    }catch(err)
    {
      console.log(`Error find then see it ${err}`);
    }
}