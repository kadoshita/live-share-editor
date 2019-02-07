window.addEventListener('load', function () {
    var socket = io();

    var editor = ace.edit('editor');
    editor.setReadOnly(true);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp');

    socket.on('keyevent', function (msg) {
        editor.setValue(msg);
    });
    socket.on('changelang', function (lang) {
        editor.session.setMode('ace/mode/' + lang);
    });

    socket.emit('join', location.search.replace('?', '').split('session=')[1]);
});