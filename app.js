const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();

const PORT = (process.env.PORT || 3000);

const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789';

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + '/public/editor.html');
});
app.get('/favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/public/favicon.ico');
});
app.get('/logo.png', (req, res) => {
    res.sendFile(__dirname + '/public/logo.png');
})

let getRandStr = () => {
    let randStr = '';
    for (var i = 0; i < 8; i++) {
        randStr += ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
    }

    return randStr;
};

io.on('connection', (socket) => {
    let sessionId = '';
    console.log('connection');
    socket.on('join', _sessionId => {
        if (_sessionId) {
            console.log(`session id:${_sessionId}`);
            socket.join(_sessionId);
            sessionId = _sessionId;
        } else {
            let _sessionId = getRandStr();
            console.log(`new session id:${_sessionId}`);
            socket.join(_sessionId);
            io.to(socket.id).emit('sessionStart', _sessionId);
            sessionId = _sessionId;
        }
    });
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
    socket.on('keyevent', (key) => {
        socket.broadcast.to(sessionId).emit('keyevent', key);
    });
    socket.on('changelang', (lang) => {
        socket.broadcast.to(sessionId).emit('changelang', lang);
    });
});

http.listen(PORT, () => {
    console.log(`server start http://localhost:${PORT}`);
});