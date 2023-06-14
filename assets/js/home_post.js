{
    let createPost = function(){
        let newPostForm = $('#new-post-formed');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/feed',
                data:newPostForm.serialize(),
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-push-botton', newPost));
                },error:function(err){
                    console.error(err.responseText);
                }
            })
        })
    }
    
    let newPostDom = function(it){
        return $(`
        <li id="post-${it._id}">
            <small>
                <a class="delete-push-botton" href="/posts/destroy/${it._id}">x</a>
            </small>
            ${ it.content}
            <br>
            ${ it.user.name }
            <br>
            
                <!--                This is throuth Query  
                    <form action="/comment/create?_id=${it._id}" id="new-comment-formed" method='post'>
                    <textarea name="content" id="" cols="40" rows="1" placeholder="Type here to add comments .."></textarea>
                    <input type="submit" value="Comment">
                </form> -->
                <form action="/comment/create" id="new-comment-formed" method='post'>
                    <textarea name="content" id="" cols="40" rows="1" placeholder="Type here to add comments .." required></textarea>
                    <input type="hidden" name="post_value" id="postvalue" value="${ it._id }" >
                    <input type="submit" value="Comment">
                </form>
            <div id="post-comments-list">
                <ul id="post-comment-${it._id}">
                    
                </ul>
            </div>
        </li>
        `)
    }


    //Method to delete a post from dom

    let deletePost = function(deleteLink){
        console.log(deleteLink);
        $(deleteLink).click(function(e){
            console.log("say hello");
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log("value of url " + $(deleteLink).prop('href'));
                    $(`#post-${data.data.post_id}`).remove();
                    console.log(data);
                },error:function(err){
                    console.error(err.responseText);
                }
            })
        })
    }

    createPost();

    let createComment = function(){
        let newCommentForm = $('#new-comment-formed');
        newCommentForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/comment/create',
                data:newCommentForm.serialize(),
                success:function(data){
                    console.log(data);
                    let newComment = newCommentDom(data.data.post);
                    $('#post-comments-list>ul').prepend(newComment);
                    deleteComment($(' .delete-push-comment', newComment));
                },error:function(err){
                    console.error(err.responseText);
                }
            })
        })
    }
    
    let newCommentDom = function(com){
        return $(`
        <li id="comment-${com._id}">
                <small>
                    <a href="/comment/destroy/${com._id}">x</a>
                </small>
                ${ com.content}
            <br>
            ${com.user.name}
        </li>
        `)
    }


    //Method to delete a post from dom

    let deleteComment = function(deleteLink){
        $(deleteLink).click(function(e){
            console.log("say hello");
            e.preventDefault();
            $.ajax({
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log("say hello");
                    $(`#post-${data.data.comment_id}`).remove();
                },error:function(err){
                    console.error(err.responseText);
                }
            })
        })
    }

    createComment();
}