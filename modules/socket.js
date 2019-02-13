module.exports = server => {
    const io = require('socket.io')(server);

    io.on('connection', socket => {
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
        socket.on('keyevent', key => {
            socket.broadcast.to(sessionId).emit('keyevent', key);
        });
        socket.on('changelang', lang => {
            socket.broadcast.to(sessionId).emit('changelang', lang);
        });
    });
};

let getRandStr = () => {
    const ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let randStr = '';
    for (let i = 0; i < 8; i++) {
        randStr += ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
    }

    return randStr;
};