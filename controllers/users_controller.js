const User = require('../models/user')

const passport = require('passport');

module.exports.profile = async function(req,res){
    const us = await User.findById(req.params.id);
    return res.render('profile',
    {
        title:"User controller in profile page",
        profile_user:us
    }) ;
}

module.exports.update = async function(req,res){
  if(req.user.id==req.params.id)
  {
    try{
      const user = await User.findByIdAndUpdate(req.params.id,req.body);
    }catch(err)
    {
      console.log(`show me the error ${err}`);
    }
    return res.redirect('back');
  }else{
    return res.status(401).send('Unauthorized');
  }
}

module.exports.signup = function(req,res){

    if(req.isAuthenticated())
    {
      return res.redirect("/users/profile");
    }
    return res.render('signup',{
      title:"Codeil sign up"
    })
  }

module.exports.signin = function(req,res){

    if(req.isAuthenticated())
    {
      return res.redirect("/users/profile");
    }
    return res.render('signin',{
        title:"Codeil sign in"
    })
}

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
      return res.redirect('back');
    }
  
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        const newuser = await User.create(req.body);
        return res.redirect('/users/signin');
      } else {
        return res.redirect('back');
      }
    } catch (err) {
      console.log("Error found in creating new element", err);
    }
  };
  

//  get the sign in and create a session
module.exports.createSession = function(req, res){
  console.log("its me here in createsessio ");
  return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
  req.logout(function(err){
    console.log("error in making value ",err);
  });
  return res.redirect('/');
};
