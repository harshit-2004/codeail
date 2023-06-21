class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        console.log("request received");
        this.socket = io.connect('http://localhost:3000/', { transports : ['websocket'] });

        if (this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self = this;
        console.log("io call comming here ",this.socket);
        this.socket.on('connect',function(){
            console.log('connection established using sockets...!',self.socket.id);
            self.socket.emit('join_room',{
                userEmail:self.userEmail,
                chatroom:'codeial'
            })
            self.socket.on('user_joined',function(data){
                console.log('a user joined',data);
            })
        });
        $('#send-messages').click(function(){
            let mes = $('#chat-messages-input').val();
            if(mes!=""){
                console.log("say value ",mes);

                self.socket.emit('send_message',{
                    message:mes,
                    userEmail:self.userEmail,
                    chatroom:"codeial"
                })
            }
        })
        self.socket.on('receive_message',function(data){
            console.log("message received",data.message);
            let newmessage = $('<li>');
            let messageType = 'other-messages';
            if(data.userEmail==self.userEmail){
                messageType='self-messages'
            }
            newmessage.append($('<span>',{
                'html':data.message
            }))
            newmessage.append($('<sub>',{
                'html':data.userEmail
            }))
            newmessage.addClass(messageType);

            $('#chat-messages-list').append(newmessage);
        })

    }
}