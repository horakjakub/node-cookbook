#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
app.get('/hello', function (req, res) {
    res.writeHead(200);
    res.send();
});
app.listen(3000, function () {
    console.log('Node-cookbook app listening on port 3000!');
});
