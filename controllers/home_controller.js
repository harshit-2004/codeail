module.exports.home = function(req,res){
    console.log(req.cookies);
    // res.cookie('user_id',25);
    if(req.cookies.user_id==25)
    {
        console.log("Yes cookie value is equal to 25");
    }
    return res.render('home',{
        title:"Home"
    })
}