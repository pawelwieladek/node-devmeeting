module.exports = function(io) {
  io.on('connection', function(socket) {

    var username;

    socket.on('new user connected', function(user) {
      username = user;
      socket.broadcast.emit('new user connected', username);
    });

    socket.on('chat message', function(msg) {
      socket.emit('chat message', msg);
      socket.broadcast.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
      socket.broadcast.emit('user disconnected', username);
    });

  });
};
