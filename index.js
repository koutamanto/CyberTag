// Expressを読み込む
var express = require('express');
var app = express();

// サーバーを構築
var http = require('http').Server(app);

// Socket.ioを読み込み、サーバーと紐付け
var io = require('socket.io')(http);

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});
/**
 * Create google maps Map instance.
 * @param {number} lat
 * @param {number} lng
 * @return {Object}
 */
 var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('Server Running.');
});