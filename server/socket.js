//var clientList = io.of('/').clients(callback);

var GetClientList = function (io, cb) {
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
};

var UpdateClientList = function(io, cb) {
  GetClientList(io, function (list) {
    io.emit('client-list', list);
  });
  
  cb() || return;
};

module.exports = function (io) {
  return function (socket) {
    console.log("Client " + socket.id + " connected");

    UpdateClientList(io);

    socket.on('disconnect', function () {
      UpdateClientList(io);
      console.log("Client " + socket.id + " disconnected");
    });
  };
};
