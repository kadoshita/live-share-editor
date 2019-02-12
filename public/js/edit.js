window.addEventListener('load', () => {
    let langSelect = document.getElementById('lang-select');
    let socket = io();
    let editor = ace.edit('editor');

    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp');

    let prevCode = localStorage.getItem('prevcode');
    if (prevCode) {
        editor.setValue(prevCode);
    }

    let prevLang = localStorage.getItem('prevlang')
    if (prevLang) {
        for (var i in langSelect.children) {
            if (langSelect.children[i].value == prevLang) {
                langSelect.children[i].selected = true;
                editor.session.setMode(`ace/mode/${prevLang}`);
            }
        }
    }

    editor.session.on('change', delta => {
        socket.emit('keyevent', editor.getValue());
    });

    langSelect.addEventListener('change', () => {
        editor.session.setMode(`ace/mode/${langSelect.value}`);
        socket.emit('changelang', langSelect.value);
    });

    socket.emit('join');

    socket.on('sessionStart', sessionId => {
        let sessionLink = document.getElementById('session-link');
        sessionLink.href = `/?session=${sessionId}`;
        sessionLink.innerText = `${location.origin}/?session=${sessionId}`;
    });

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('prevcode', editor.getValue());
        localStorage.setItem('prevlang', langSelect.value);
    });
});