
    
var socket = io();


socket.on('connect', function() {
    console.log("Connected to server");



    socket.on('newMessage', function (incomingMessage) {
        console.log("new Email " , incomingMessage)
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


socket.on('newEmail', function(email){
    console.log("New Email", email);
});


