const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = 'w';
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', { title: 'Multiplayer Chess Game' });
});
io.on("connection", (socket) => {
    // ----------------------------------------------------------
    console.log("A user connected:", socket.id);
    if(!players.white) {
        players.white = socket.id;
        socket.emit('playerRole', 'w');
    }
    else if(!players.black) {
        players.black = socket.id;
        socket.emit('playerRole', 'b');
    } else {
        socket.emit('playerRole', 'spectator');
    }
    // ----------------------------------------------------------
    socket.on('disconnect',()=>{
        console.log("A user disconnected:", socket.id);
        if(players.white === socket.id) {
            delete players.white;
        } else if(players.black === socket.id) {
            delete players.black;
        }
    })
    // ----------------------------------------------------------
    socket.on(('move'),(move)=>{
        try {
            if (chess.turn() === 'w' && players.white !== socket.id) return;
            if (chess.turn() === 'b' && players.black !== socket.id) return;

            const result = chess.move(move);
            if (result) {
                currentPlayer = chess.turn();
                io.emit('move', move);
                io.emit('boardState', chess.fen());
            }
            else{
                socket.emit('invalidMove', move);
            }
        } catch (err) {
            console.log(err);
            socket.emit('invalidMove', move);
        }
    })

});
server.listen(3000, () => {
    console.log('Server is running on port 3000');
})