const Like = require('../models/like');

const Comment = require('../models/comment');

const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try{
        let likeabl;
        let deleted = false;
        if(req.query.type=='Post')
        {
            likeabl = await Post.findById(req.query.id).populate('likes');
        }else{  
            likeabl = await Comment.findById(req.query.id).populate('likes');
        }

        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })
        console.log("seeing the existing like value ",existingLike);
        if(existingLike){
            // console.log("say hello to ",existingLike);
            // console.log(likeabl);
            likeabl.likes.pull(existingLike);
            likeabl.save();
            // console.log("work done ");
            await Like.findByIdAndDelete(existingLike._id);
            deleted=true;
        }else{
            let newLike = await Like.create({
                user:req.user._id,
                likeable:req.query.id,
                onModel:req.query.type
            })
            console.log("giving the value " ,newLike);
            likeabl.likes.push(newLike);
            likeabl.save();
        }
        return res.json(200,{
            message:"Request successful",
            data:{
                deleted:deleted
            }
        })
    }catch(err){
        console.log(err);
        return res.json(500,{
            message:"Internal servere errer"
        })
    };
}