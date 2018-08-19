const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')
const {isRealString} = require('./utils/validation');

const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);



const publicPath = path.join(__dirname,'../public');





app.use(express.static(publicPath));

io.on('connection' , (socket) =>{
 console.log('New user connected');


    socket.on('join', (params , callback) =>{
        if(!isRealString(params.name) || !isRealString(params.room)){
        callback('Name and romm name are required');
        }
        

        socket.join(params.room);


        socket.emit('newMessage',generateMessage("Admin" , "Welcome to the chat app"));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin" , `${params.name} has joined`));


        socket.on('disconnect' , () =>{
            console.log("User have disconnected");
            socket.broadcast.to(params.room).emit('newMessage' , generateMessage("Admin" ,`${params.name} has left`));
        });

        // socket.leave(params.room);

        //to everyone
        //io.emit -> io.to(params.room).emit
        //everyone exept the user
        //socket.broadcast.emit
        //to one user
        //socket.emit 

        callback();
    });





    

    socket.on('createMessage', (newEmail, callback) =>{
        console.log(newEmail);
        io.emit('newMessage',generateMessage(newEmail.from,newEmail.text))
        callback();

        /*socket.broadcast.emit('newMessage', {
            from: newEmail.from,
            text: newEmail.text,
            createdAt : new Date().getTime()
        })*/

    });


    socket.on('createLocationMessage', (coords) =>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    

  
 });





server.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});