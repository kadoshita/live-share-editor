const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();

const PORT=process.env.NODE_SERVER_PORT;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + '/public/editor.html');
});

io.on('connection', (socket) => {
    console.log('connection');
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
    socket.on('keyevent', (key) => {
        socket.broadcast.emit('keyevent', key);
    });
});

http.listen(PORT, () => {
    console.log(`server start http://localhost:${PORT}`);
});