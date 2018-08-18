
    
var socket = io();


socket.on('connect', function() {
    console.log("Connected to server");

    socket.on('admin', function(adminMessage) {
        console.log('Admin' , adminMessage);
    });

    socket.on('newMessage', function (incomingMessage) {
        console.log("new Email " , incomingMessage);

        var li = jQuery('<li></li>');
        li.text(`${incomingMessage.from}: ${incomingMessage.text}`);

        jQuery('#messages').append(li);
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});



jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();


    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()

    }, function() {

    })
});


