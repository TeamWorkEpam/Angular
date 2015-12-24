if (!window.WebSocket) {
	document.body.innerHTML = 'WebSocket в этом браузере не поддерживается.';
}

// создать подключение
var socket = new WebSocket("ws://localhost:8081");

// отправить сообщение из формы publish
document.forms.publish.onsubmit = function() {
  var outgoingMessage = this.message.value;
  var outgoingName = this.name.value;
    
  socket.send(outgoingMessage);
  socket.send(outgoingName);
  return false;
};

// обработчик входящих сообщений
socket.onmessage = function(event) {
  var incomingMessage = event.data;
  showMessage(incomingMessage); 
};

// показать сообщение в div#subscribe
function showMessage(message, name) {
  var messageElem = document.createElement('div');
  messageElem.appendChild(document.createTextNode(message, name));
  document.getElementById('subscribe').appendChild(messageElem);
}
