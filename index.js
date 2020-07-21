// Expressを読み込む
var express = require('express');
var app = express();

// サーバーを構築
var http = require('http').Server(app);
app.use(express.static(__dirname + '/'));
// Socket.ioを読み込み、サーバーと紐付け
const io = require('socket.io').listen(http);

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