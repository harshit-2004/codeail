const User = require('../../../models/user');

const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    console.log("say hello");
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user||user.password!=req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
              })
        }
        return res.json(200,{
            message:"Signed in Succesfull here is your token keep it safe",
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{
                    expiresIn:100000
                })
            }
          })
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal server error in making new values "
        })
    }

  }