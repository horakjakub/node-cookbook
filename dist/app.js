"use strict";
/**
 * Created by jhorak on 17.07.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
app.get('/hello', function (req, res) {
    res.writeHead(200);
    res.send();
});
app.listen(port, function () {
    console.log('Node-cookbook app listening on port 3000!');
});
