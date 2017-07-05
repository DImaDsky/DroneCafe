"use strict";
const express = require('express'),
    app = module.exports = express(),
    order = require('../mongodb/order'),
    account = require('../mongodb/account');


app.get('/', (req, res) => {
    order.find({}, orders => {
        res.send(orders);
    });
});

app.get('/:email', (req, res) => {
    let email = req.params.email;
    order.find({email: email}, orders => {
        res.send(orders);
    });
});

app.post('/:email', (req, res) => {//add new orders
    let email = req.params.email,
        orders = req.body.order;
    order.add(email, orders, () => {
        let writeOff = 0;
        orders.forEach(order => {
            writeOff -= order.price;
        });
        account.topUp(email, writeOff, () => {
            res.send({result: true});
        });
    });
});