#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('task-manager:server');
var http = require('http');
var wsHandler = require('../routes/index')
var Task = require('../models/task');
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

var expressWs = require('express-ws')(app, server);
var aWss = expressWs.getWss('/');

app.ws('/', function(ws, req, next) {
  ws.on('message', async function(msg) {
    console.log('msg:', msg);
    if (msg !== 'Hello Server!') {
      var message = JSON.parse(msg);
      if (message.newTask !== undefined) {
        var newTask = new Task(message.newTask);
        await newTask.save();
      }
      if (message.editTask !== undefined) {
        var update = message.editTask;
        await Task.findByIdAndUpdate(update.id, update);
      }
      if (message.deleteTask !== undefined) {
        await Task.findByIdAndRemove(message.deleteTask);
      }
    }
    var x = await wsHandler.data();
    console.log(x);
    //ws.send(JSON.stringify(x));
    aWss.clients.forEach(function (client) {
     client.send(JSON.stringify(x));
    });
  });
});


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
