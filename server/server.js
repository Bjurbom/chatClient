const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
var io = socketIO(server);



const publicPath = path.join(__dirname,'../public');

console.log(__dirname + '/../public');
console.log(publicPath);



app.use(express.static(publicPath));

io.on('connection' , (socket) =>{
 console.log('New user connected');



    socket.on('createEmail', (newEmail) =>{
        console.log(newEmail);
        io.emit('newMessage',{
            from: newEmail.from,
            text: newEmail.text,
            createdAt : new Date().getTime()
        })
    });

    

    socket.on('disconnect' , () =>{
        console.log("User have disconnected");
    });
 });





server.listen(port, ()=>{
    console.log(`server is running on ${port}`);
});