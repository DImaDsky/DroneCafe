"use strict";
const express = require('express');
const app = module.exports = express();

app.get('/:email', function (req, res) {
    let email = req.params.email;
    res.send({name:"hello", email:'sa@sa.re', credits: 180});
});

app.get('/:email/:credits', function (req, res) {
    let email = req.params.email;
    let credits = req.params.credits;
    res.send({name:"Addedss", email:'sa@sa.re', credits: 280});
});