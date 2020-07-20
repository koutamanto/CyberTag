var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io');
io.listen(http);
http.listen(8080);