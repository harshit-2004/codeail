// console.log("say hello");
// class ToggleLike{
//     constructor(toggleElement){
//         console.log("givinthe value fo toogle element insied the constructor",toggleElement);
//         this.toggler = toggleElement;
//         this.toggleLike();
//     }

//     toggleLike(){
//         console.log("inside togglelike");
//         $(this.toggler).click(function(e){
//             e.preventDefault();
//             let self = this;
//             console.log("giving the value of self",self);
//             $.ajax({
//                 type:"post",
//                 url:$(self).attr('href')
//             })
//             .done(function(data){
//                 console.log(data);
//                 let likeCount = parseInt($(self)).attr('data-likes');
//                 console.log(likeCount);
//                 if(data.data.deleted==true){
//                     likeCount-=1;
//                 }else{
//                     likeCount+=1;
//                 }
//                 $(self).attr('data-likes',likeCount);
//                 $(self).html(`${likeCount} Likes`);
//             })
//             .fail(function(errData){
//                 console.log('error in completing the request',errData);
//             })
//         })
//     }
    
// }

// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    
                }else{
                    likesCount += 1;
                }


                $(self).attr('data-likes', likesCount);
                $(self).html(`<i class="fa fa-heart"> </i>${likesCount} Likes`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
