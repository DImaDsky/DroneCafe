"use strict";
const express = require('express'),
    app = module.exports = express(),
    order = require('../mongodb/order');


app.get('/', function (req, res) {
    order.find({}, function (orders) {
        res.send(orders);
    });
});

app.get('/:email', function (req, res) {
    let email = req.params.email;
    order.find({email: email}, function (orders) {
        res.send(orders);
    });
});

app.post('/:email', function (req, res) {
    let email = req.params.email,
        orders = req.body.order;

    order.add(email, orders, function () {
        res.send({result: true});
    });
});