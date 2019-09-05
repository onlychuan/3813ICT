const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');

const PORT = 3000;  //Define port used for the server

app.use(cors());   //Apply express middleware

sockets.connect(io, PORT);  //Setup Socket

server.listen(http, PORT);  //Start server listening for requests
/*
//Route for default page (root of site)
app.get('/',function(req,res){
    res.sendFile(__dirname+"/../src/app/chat/chat.component.html");
});
*/