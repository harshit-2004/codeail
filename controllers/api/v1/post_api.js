const Post = require('../../../models/post');

const Comment = require('../../../models/comment');
 
 module.exports.index = async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
      path:'comments',
      populate:{
        path:'user'
      }
    });

    return res.json(200,{
        message:"list of message",
        posts:posts
    })
 }

 module.exports.destroy = async function(req, res) {
    try {
      const post = await Post.findById(req.params.id);
  
        if(post.user==req.user.id){
            await Post.findByIdAndDelete(post._id);
            await Comment.deleteMany({ post: req.params.id });
                return res.json(200,{
                    message:"Post Deleted Succesfull"
                })
        }else{
            return res.json(401,{
                message:"You are not authorized to delete it"
            })
        }
    } catch (err) {
        console.log(err);
        return res.json(500,{
            message:"Internal server error in making new values "
        })
    }
  };