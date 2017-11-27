var clientList = [];

module.exports = function (io) {
  return function (socket) {
    console.log("Client " + socket.id + " connected");
    clientList.push(socket.id);


    getClientList(function (list) {
      io.emit('client-list', list);
      socket.emit('you-are', list);
    });

    socket.on('disconnect', function () {
      var i = clientList.indexOf(socket.id);
      if(i != -1) {
      	clientList.splice(i, 1);
      }
      getClientList(function (list) {
        io.emit('client-list', list);
      });
      console.log("Client " + socket.id + " disconnected");
    });
  };
};

var getClientList = function (cb) {
  var output = "";
  for (var i = 0; i < clientList.length; i++) {
    output += "<li>" + clientList[i] + "</li>";
  }
  output = "<ul>" + output + "</ul>";
  cb(output);
}
