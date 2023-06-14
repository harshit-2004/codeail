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
            
            if(req.xhr){
              return res.status(200).json({
                data:{
                  post:newcomment
                },
                message:"Comment Created Successful"
              });
            }
          }
            return res.redirect('back');
      }catch(err)
      {
        console.log(`Error find then see it ${err}`);
      }
}

module.exports.destroy = async function(req,res){
  const comm = await Comment.findById(req.params.id);
  console.log(comm);
  if(req.user.id==comm.user)
  {
    const post_id = comm.post;
    console.log("post id "+post_id);
    await Post.updateOne(
      { _id: post_id }, // Use "_id" for searching by document ID
      { $pull: { comments: comm._id } } // Specify the field as an array and provide the comment ID to remove
    );
    
    await Comment.findByIdAndDelete(comm._id);
    
    if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id
        },
        message:"Post Deleted Succesfull"
      })
    }
    return res.redirect('back');
  }else{
    return res.redirect('back');
  }
}