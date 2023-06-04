const User = require('../models/user')

module.exports.profile = async function(req,res){
    console.log(req.cookie);
    if(req.user_id){
        var user = await User.findById(req.cookie.user_id);
        if(user)
        {
            return res.render('profile',
            {
                title:"User controller",
                user:user
            })
        }else{
            return res.redirect('/users/signin');
        }
    }else{
        return res.redirect('/users/signin');
    }
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
module.exports.createSession = async function(req,res){
    try{
        var user = await User.findOne({email:req.body.email});
        if(!user)
        {
            console.log("User not found ");
            return res.redirect("back");
        }
        if(user.password!=req.body.password)
        {
            console.log("Password Incorrect ",user.password+" "+req.password);
            return res.redirect("back");
        }
        res.cookie('user_id',user.id);
        return res.redirect("/users/profile");
    }catch(err){
        console.log('Error ',err);
    }
}