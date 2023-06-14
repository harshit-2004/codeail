const passport = require('passport');

const User = require('../models/user');

const Post = require('../models/post');
const { populate } = require('../models/post');

module.exports.home = async function(req,res){
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec()
    .then(async (posts) => {
      const us = await User.find({});
      return res.render('home', {
        title: "Home",
        arr: posts,
        all_user:us
      });
    }).catch((err) => {
      console.log(`Error in finding all posts: ${err}`);
    });
  
}