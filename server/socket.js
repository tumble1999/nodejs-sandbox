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
  var output;
  output = "";
  io.clients(function (error, clients) {
    if (error) throw error;
    console.log("Clients Connected: " + clients.length);
    for (var i = 0; i < clients.length; i++) {
      console.log("Client " + i + ": " + clients[i]);
      output += "<li>" + clients[i] + "</li>";
      console.log("<li>" + clients[i] + "</li>");
      console.log("output: " + output);
    }
  });
  
  console.log("output: " + output);
  output = "<ul>" + output + "</ul>";
  console.log("output: " + output);
  
  cb(output);
}
