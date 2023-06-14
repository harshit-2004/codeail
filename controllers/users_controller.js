const User = require('../models/user')

const passport = require('passport');

const fs = require('fs');

const path = require('path');

module.exports.profile = async function(req,res){
    const us = await User.findById(req.params.id);
    return res.render('profile',
    {
        title:"User controller in profile page",
        profile_user:us
    }) ;
}

module.exports.update = async function(req,res){
  // if(req.user.id==req.params.id)
  // {
  //   try{
  //     const user = await User.findByIdAndUpdate(req.params.id,req.body);
  //   }catch(err)
  //   {
  //     console.log(`show me the error ${err}`);
  //   }
  //   return res.redirect('back');
  // }else{
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id==req.params.id){

    try{

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req,res,async function(err){
        if(err){
          console.log("****MULter Error :",err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){
          if(user.avatar){
            fs.access(path.join(__dirname,'..',user.avatar), fs.constants.F_OK, (err) => {
              if(!err){
                fs.unlink(path.join(__dirname,'..',user.avatar), (err) => {
                  if (err) throw err;
                  user.avatar = User.AVATAR_PATH+'/'+req.file.filename;
                  user.save();
                });
              }else{
                console.log("file not found ");
              }
            });
          }else{
            user.avatar = User.AVATAR_PATH+'/'+req.file.filename;
            user.save();
          }
        }
         return res.redirect('back');

      })
    }catch(err){
      req.flash('error',err);
      return res.redirect('back');
    }

  }else{
    req.flash('error','Unauthorized');
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
  req.flash('success','You have logged in!');
  return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
  req.logout(function(err){
    if(err){
      console.log("error in making value ",err);
      return next(err);
    }
    req.flash('success','You have logged out!');
    return res.redirect('/');
  });
};