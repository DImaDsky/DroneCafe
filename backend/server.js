"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    account = require('./account'),
    order = require('./order'),
    socketIo = require('./socket/index'),
    app = express(),
    port = 5000;

let httpServer = http.Server(app);
httpServer.listen(process.env.PORT || port, function(){
    console.log("server listening on port", port);
});

socketIo.init(httpServer);
app.use(express.static(__dirname + '/../'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/account', account);
app.use('/order', order);

app.all('*', (req, res) => {
    res.send({message: '404'});
});


