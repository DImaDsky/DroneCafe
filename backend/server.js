"use strict";

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    account = require('./account'),
    order = require('./order'),
    socketIo = require('./socket/index'),
    app = express(),
    port = process.env.PORT || 3333;

let httpServer = http.Server(app);
httpServer.listen(port, function() {
    console.log("________server listening on port", port);
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


