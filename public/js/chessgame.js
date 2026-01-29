const socket = io({autoConnect: false});
function connect(){
    socket.connect();
}
function disconnect(){
    socket.disconnect();
}
