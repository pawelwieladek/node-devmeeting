var socket = io();
var templates = {
  message: _.template('<strong><%= user %></strong>: <%= msg %>'),
  connected: _.template('<strong><%= user %></strong> connected'),
  disconnected: _.template('<strong><%= user %></strong> disconnected')
};

document.getElementById('newMsgForm')
  .addEventListener('submit', function(e) {
    e.preventDefault();

    socket.emit('chat message', {
      user: window.user,
      msg: document.getElementById('msgInput').value
    });

    document.getElementById('msgInput').value = '';

  });

socket.emit('new user connected', window.user);

socket.on('new user connected', function(username) {
  displayMsg(templates['connected'], {
    user: username
  });
});

socket.on('chat message', function(data) {
  displayMsg(templates['message'], data);
});

socket.on('user disconnected', function(username) {
  displayMsg(templates['dconnected'], {
    user: username
  });
});

function displayMsg(template, data) {
  var li = document.createElement('li');
  var ul = document.getElementById('messages');
  li.innerHTML = template(data);
  ul.appendChild(li);
}
