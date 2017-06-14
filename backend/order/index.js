"use strict";
const express = require('express');
const app = module.exports = express();

app.get('/', function (req, res) {
    res.send([{title:'aaa', id:123,status:'ready'},{title:'bbb', id:124, status:'preparing'},
        {title:'ccc', id:125,status:'ordered'},{title:'dddd', id:126,status:'delivering'}]);
});

app.get('/:email', function (req, res) {
    let email = req.params.email;
    res.send([{title:'aaa', id:123, status:'ready'},{title:'bbb', id:124,status:'in progress'}]);
});