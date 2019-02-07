module.exports = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        var sessionId = '';
        console.log('connection');
        socket.on('join', function (_sessionId) {
            if (_sessionId) {
                console.log('session id:' + _sessionId);
                socket.join(_sessionId);
                sessionId = _sessionId;
            } else {
                var _sessionId = getRandStr();
                console.log('new session id:' + _sessionId);
                socket.join(_sessionId);
                io.to(socket.id).emit('sessionStart', _sessionId);
                sessionId = _sessionId;
            }
        });
        socket.on('disconnect', function () {
            console.log('disconnect');
        });
        socket.on('keyevent', function (key) {
            socket.broadcast.to(sessionId).emit('keyevent', key);
        });
        socket.on('changelang', function (lang) {
            socket.broadcast.to(sessionId).emit('changelang', lang);
        });
    });
};

function getRandStr() {
    var ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789';

    let randStr = '';
    for (var i = 0; i < 8; i++) {
        randStr += ALPHANUMERIC[Math.floor(Math.random() * ALPHANUMERIC.length)];
    }

    return randStr;
}