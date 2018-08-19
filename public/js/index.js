
    
var socket = io();


socket.on('connect', function() {
    console.log("Connected to server");

    socket.on('admin', function(adminMessage) {
        console.log('Admin' , adminMessage);
    });



    //new message
    socket.on('newMessage', function (incomingMessage) {

        var formattedTime = moment(incomingMessage.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template, {
            text: incomingMessage.text,
            from: incomingMessage.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);




        /*

        console.log("newMessage" , incomingMessage);

        var li = jQuery('<li></li>');
        li.text(`${incomingMessage.from} ${formattedTime} : ${incomingMessage.text}`);

        jQuery('#messages').append(li);*/
    });
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});


socket.on('newLocationMessage', function (message) {
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#messageLocation-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    })

    jQuery('#messages').append(html);



    /*
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from} ${formattedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);*/
});


var messageTextbox = jQuery('[name=message]');


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();


    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()

    }, function() {
        messageTextbox.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){

    if(navigator.geolocation == null){
        return alert("Geolocation not supported by your browser");
    }
    //sätter en attribute
    locationButton.attr('disabled', 'disabled').text('Sending location....');

    navigator.geolocation.getCurrentPosition(function(position) {

        locationButton.removeAttr('disabled').text('Send location');

        socket.emit('createLocationMessage' , {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function (e) {
        locationButton.removeAttr('disabled').text('Send location');
        alert('unable to fetch location');
    })
})

