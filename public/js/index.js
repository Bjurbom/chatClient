
    
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


socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');


    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});



jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();


    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()

    }, function() {

    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){

    if(navigator.geolocation == null){
        return alert("Geolocation not supported by your browser");
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage' , {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function (e) {
        alert('unable to fetch location');
    })
})

