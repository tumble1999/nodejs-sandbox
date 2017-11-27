const http = require('http');
const app = require('./server');
const socketIO = require('socket.io');

var server = http.Server(app);
var io = socketIO(server);

var port = '3000';

io.on("connect", require("./server/socket.js")(io));

server.listen(port, function () {
  console.log('Server running on port ' + port);
});
