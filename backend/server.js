"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    account = require('./account'),
    order = require('./order'),
    app = express(),
    port = 3333;

let httpServer = http.Server(app);
httpServer.listen(port, function(){
    console.log("server listening on port", port);
});

app.use(express.static(__dirname + '/../'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/account', account);
app.use('/order', order);

app.all('*', (req, res) => {
    res.send({message: '404'});
});



//cd C:\Program Files\MongoDB\Server\3.4\bin  //mongod

let socketsUsers = {};
let zz = 0;
let io = require('socket.io').listen(httpServer);

io.sockets.on('connection', function(socket){

    console.log("connected", ++zz);

    socket.on("new-user", function(user){
        socketsUsers[user.email] = this.id;
    });

    socket.on("status-change", function(dish){
        //1 to DB
        //2 tell client
        // console.log("something:" + data);
        debugger
    });

    socket.on('disconnect', function() {
        for(let i in  socketsUsers){
            if(socketsUsers.hasOwnProperty(i) && socketsUsers[i] == this.id){
                delete socketsUsers[i];
            }
        }
    });
});

