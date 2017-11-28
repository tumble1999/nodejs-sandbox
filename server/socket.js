//var clientList = io.of('/').clients(callback);

module.exports = function (io) {
  return function (socket) {
    console.log("Client " + socket.id + " connected");

    getClientList(io, function (list) {
      io.emit('client-list', list);
    });

    socket.on('disconnect', function () {
      getClientList(io, function (list) {
        io.emit('client-list', list);
      });
      console.log("Client " + socket.id + " disconnected");
    });
  };
};

var getClientList = function (io, cb) {
  var output = "";
  io.clients(function (error, clients) {
    if (error) throw error;
    for (var i = 0; i < clients.length; i++) {
      output += "<li>" + clients[i] + "</li>";
    }
  });
  output = "<ul>" + output + "</ul>";
  console.log("output: " + output);
  
  cb(output);
}
