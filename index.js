var app = express();

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io=require('socket.io').listen(server);
const cron = require('node-cron');
 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
 
http.listen(3000, () => {
  console.log('listening on *:3000');
});
 
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
 
cron.schedule('*/5 * * * * *', () => {
  console.log('send hello.');
  io.emit('message', 'hello');
});