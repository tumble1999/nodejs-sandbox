//var clientList = io.of('/').clients(callback);

var GetClientList = function (io, cb) {
  var output;
  
  io.clients(function (error, clients) {
    if (error) throw error;
    
    output = "";
    
    for (var i = 0; i < clients.length; i++) {
      output += "<li>" + clients[i] + "</li>";
    }
    
    output = "<ul>" + output + "</ul>";
  
    return cb(output);
  });
};

var UpdateClientList = function(io, cb) {
  GetClientList(io, function (list) {
    io.emit('client-list', list);
  });
  
  if (cb) {
    return cb();
  }
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
