"use strict";
const express = require('express'),
    app = module.exports = express(),
    account = require('../mongodb/account');
console.log("2222222222");
app.get('/:email/:name', function (req, res) {
    let email = req.params.email,
        name = req.params.name;
    console.log("333333");
    account.find(email, user => {
        console.log("444444444");
        if (user){
            res.json(user);
        } else {
            account.save({name: name, email: email, credits: 100}, userData => {
                res.send(userData);
            })
        }
    });
});

app.put('/:email', function (req, res) {
    let email = req.params.email,
        credits = req.body.credits;

    account.topUp(email, credits, () => {
        account.find(email, user => {
            res.json(user);
        });
    });
});