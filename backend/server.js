"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    account = require('./account'),
    order = require('./order'),
    app = express(),
    // session = require('express-session')({
    //     secret: "aliensAreAmongUs",
    //     resave: true,
    //     saveUninitialized: true
    // }),
    // //socket = require('./socket'),
    // sharedsession = require('express-socket.io-session'),
    {mongoose, db} = require('./mongodb/mongooseConnect'),
    port = 3333;

// app.use(express.static(__dirname + '/views1111/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(session);

app.use('/account', account);
app.use('/order', order);

app.all('*', (req, res) => {
    res.send({message: '404'});
});

let httpServer = http.Server(app);
httpServer.listen(port, function(){
    console.log("server listening on port", port);
});

//cd C:\Program Files\MongoDB\Server\3.4\bin  //mongod
// let kitchen = io.of('/kitchen');
// let clients = io.of('/clients');

// clients.on('connection',(socket) => {
//     socket.on()
//     socket.emit()
//     io.emit()//to all
// });
// let io = require('socket.io').listen(httpServer);
// io.use(sharedsession(session));
// io.on('connection', function(socket){
//     console.log("connected");
//     socket.emit("greetings", {msg:"hello"});
//     socket.on("something", function(data){
//         console.log("something:" + data);
//     })
// });

