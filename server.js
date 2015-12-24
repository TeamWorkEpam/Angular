var http = require('http');
var Static = require('node-static');
var WebSocketServer = new require('ws');

// подключенные клиенты
var clients = {};

// WebSocket-сервер на порту 8081
var webSocketServer = new WebSocketServer.Server({port: 8081});
webSocketServer.on('connection', function(ws, name) {

  var id = Math.random();
  clients[id] = name;
  console.log("новое соединение " + id);

  ws.on('message', function(message, name) {
    console.log('получено сообщение ' + message, name + id);

    for(var key in clients) {
      clients[key].send(message, name);
    }
  });

  ws.on('close', function() {
    console.log('соединение закрыто ' + id);
    delete clients[id];
  });

});


// обычный сервер (статика) на порту 8080
var fileServer = new Static.Server('.');
http.createServer(function (req, res) {
  
  fileServer.serve(req, res);

}).listen(8080);

console.log("Сервер запущен на портах 8080, 8081");

