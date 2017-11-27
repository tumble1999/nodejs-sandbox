var socket = io();

 $(function () {
   $('main').html('<span class="youAre"></span><div class="clientList"></div>');
 });


socket.on("client-list", function (clientList) {
  $('span.youAre').text("You are: " + socket.id);
  $('div.clientList').html(clientList);
});
