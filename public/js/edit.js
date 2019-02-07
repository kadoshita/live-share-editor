window.addEventListener('load', function () {
    var langSelect = document.getElementById('lang-select');
    var socket = io();

    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp');

    var prevCode = localStorage.getItem('prevcode');
    if (prevCode) {
        editor.setValue(prevCode);
    }

    var prevLang = localStorage.getItem('prevlang')
    if (prevLang) {
        for (var i in langSelect.children) {
            if (langSelect.children[i].value == prevLang) {
                langSelect.children[i].selected = true;
                editor.session.setMode('ace/mode/' + prevLang);
            }
        }
    }

    editor.session.on('change', function (delta) {
        socket.emit('keyevent', editor.getValue());
    });

    langSelect.addEventListener('change', function () {
        editor.session.setMode('ace/mode/' + langSelect.value);
        socket.emit('changelang', langSelect.value);
    });

    socket.emit('join');

    socket.on('sessionStart', function (sessionId) {
        document.getElementById('session-link').href = '/?session=' + sessionId;
        document.getElementById('session-link').innerText = location.origin + '/?session=' + sessionId;
    });

    window.onbeforeunload = function () {
        localStorage.setItem('prevcode', editor.getValue());
        localStorage.setItem('prevlang', langSelect.value);
    }
});