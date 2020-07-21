var express = require('express');
var router = express.Router();

/* 以下追加 */
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
/* 以上追加 */

router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});

/* 以下追加 */
io.on('connection', function(socket) {
  console.log('connected!!!');
});
/* 以上追加 */

module.exports = router;