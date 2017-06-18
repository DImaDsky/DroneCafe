"use strict";
const express = require('express'),
    app = module.exports = express(),
    {mongoose, db} = require('../mongodb/mongooseConnect');

let orderSchema = new mongoose.Schema({
    id: String,
    title: String,
    email: String,
    status: String,
});

let Orders = db.model('orders', orderSchema);
Orders.on('error', function(error) {
    console.log(error);
});


app.get('/', function (req, res) {
    Orders.find({}, null, (err, orders) => {
        if(err){console.log(err)}
        res.send(orders);
    });
});

app.get('/:email', function (req, res) {
    let email = req.params.email;
    Orders.find({email: email}, null, (err, orders) => {
        if(err){console.log(err)}
        res.send(orders);
    });
});

app.post('/:email', function (req, res) {
    let email = req.params.email,
        orders = req.body.order,
        promises = [];

    if(orders.length){
        orders.forEach(item => {
            item.email = email;
            item.status = 'Ordered';

            let order = new Orders(item);
            promises.push(new Promise(resolve => {
                order.save((err, result)=>{
                    if(err){console.log(err)}
                    resolve();
                });
            }));
        });
        Promise.all(promises).then(() => {
            res.send({result: true});
        })
    }
});