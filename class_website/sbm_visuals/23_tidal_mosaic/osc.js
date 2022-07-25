//change IP address here
var ipAddress="127.0.0.1"

var socket;

function OnceLoaded() {
  setupOsc(12000, 6010);
}

//*****************Connect to Websocket*****************//
function setupOsc(oscPortIn, oscPortOut) {
  var ipPort = ipAddress + ':8081';
  socket = io.connect(ipPort, {
    port: 8081,
    rememberTransport: false
  });
  socket.on('connect', function() {
    socket.emit('config', {
      server: {
        port: oscPortIn,
        host: ipAddress
      },
      client: {
        port: oscPortOut,
        host: ipAddress
      }
    });
  });
  socket.on('message', function(msg) {
    if (msg[0] == '#bundle') {
      for (var i = 2; i < msg.length; i++) {
        receiveOsc(msg[i][0], msg[i].splice(1));
      }
    } else {
      receiveOsc(msg[0], msg.splice(1));
    }
  });
}

function receiveOsc(address, value) {
  console.log("received OSC: " + address + ", " + value);
}

function sendOsc(address, name, value) {
  var msg = [
         {
             type: "string",
             value: name
         },
         {
             type: "float",
             value: parseFloat(value) || 0
         }

 ];
	socket.emit('message', [address].concat(msg));
}

var JSLink = "http://" + ipAddress + ":8081/socket.io/socket.io.js"
var JSElement = document.createElement('script');
JSElement.src = JSLink;
JSElement.onload = OnceLoaded;
document.getElementsByTagName('head')[0].appendChild(JSElement);
