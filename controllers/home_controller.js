const passport = require('passport');

const Post = require('../models/post');
const { populate } = require('../models/post');

module.exports.home = async function(req,res){
    Post.find({})
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    })
    .exec()
    .then((posts) => {
      return res.render('home', {
        title: "Home",
        arr: posts
      });
    }).catch((err) => {
      console.log(`Error in finding all posts: ${err}`);
    });
  
}