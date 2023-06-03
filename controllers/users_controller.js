const User = require('../models/user')

module.exports.profile = function(req,res){
    return res.render('home',
    {
        title:"User controller"
    })
}

module.exports.signup = function(req,res){
    return res.render('signup',{
        title:"Codeil sign up"
    })
}

module.exports.signin = function(req,res){
    return res.render('signin',{
        title:"Codeil sign in"
    })
}

//  get the sign in data
// module.exports.create = async function(req,res){
//     if(req.body.password!=req.body.confirm_password)
//     {
//         return res.redirect('back');
//     }
//     try{
//         var fetchingdata = await User.findOne({email:req.body.email},async function(user){
//             if(!user){
//                 var newuser = await User.create(req.body, function(err, user){
//                     if(err) {console. log('error in creating user while signing up'); return}
//                     return res.redirect('/users/signin');
//                 })
//             }
//             else{
//                 return res.redirect('back');
//             }
//         })
//     }catch(err){
//         console.log("error found in creating new element",err);
//     }
// }

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
  

//  get the sign up data
module.exports.createSession = function(req,res){
    
}