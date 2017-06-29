"use strict";
const express = require('express'),
    app = module.exports = express(),
    account = require('../mongodb/account');

app.get('/:email/:name', function (req, res) {
    let email = req.params.email,
        name = req.params.name;

    account.find(email, user => {
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