"use strict";
const express = require('express'),
    app = module.exports = express(),
    {mongoose, db} = require('../mongodb/mongooseConnect');

let accountSchema = new mongoose.Schema({
    name: String,
    email: String,
    credits: Number
});

let User = db.model('users', accountSchema);
User.on('error', function(error) {
    console.log(error);
});


app.get('/:email/:name', function (req, res) {
    let email = req.params.email,
        name = req.params.name;

    User.findOne({email: email}, null, (err, user) => {
        if(err){console.log(err)}
        if(user){
            res.json(user);
        } else {
            let userData = {name:name, email:email, credits:100};
            let user = new User(userData);
            user.save((err, result) => {
                if(err){console.log(err)}
                res.send(userData);
            });
        }
    });
});

app.put('/:email', function (req, res) {
    let email = req.params.email,
        credits = req.body.credits;

    User.update({email: email}, { $inc: { credits: credits }}, (err, result) => {
        if(err){console.log(err);}
        res.send({email:'sa@sa.re', message: 'updated', credits: credits});
    });
});