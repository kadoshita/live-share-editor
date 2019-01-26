const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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

http.listen(8080, () => {
    console.log('server start http://localhost:8080');
});