
    
var socket = io();


socket.on('connect', function() {
    console.log("Connected to server");

    socket.on('admin', function(adminMessage) {
        console.log('Admin' , adminMessage);
    });

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

socket.emit('createEmail', {
    from: "frank",
    text: "text xD"
}, function(data){
    console.log('Got it', data);
});


