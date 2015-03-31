var express = require('express');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.set('views', 'views');
app.set('view engine', 'jade');

app.use(require('body-parser').urlencoded({
  extended: true
}));
app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'node devmeeting',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(require('./responseTime'));
app.use(express.static('./public'));

require('./app/auth')(app);
require('./app/router')(app);
require('./app/chat')(io);
