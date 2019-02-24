window.addEventListener('load', () => {
    let langSelect = document.getElementById('lang-select');
    let cursorPosition = document.getElementById('cursor-position');
    let textCount = document.getElementById('text-count');
    let socket = io();
    let editor = ace.edit('editor');

    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp');

    let prevCode = localStorage.getItem('prevcode');
    if (prevCode) {
        editor.setValue(prevCode);
        textCount.innerText = `count:${prevCode.length}`;
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
        let v = editor.getValue();
        socket.emit('keyevent', v);
        textCount.innerText = `count:${v.length}`;
    });

    editor.selection.on('changeCursor', () => {
        let p = editor.getCursorPosition();
        cursorPosition.innerText = `row:${p.row} col:${p.column}`;
    })

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

    let ratingGood = document.getElementById('rating-good');
    let ratingBad = document.getElementById('rating-bad');

    ratingGood.addEventListener('click', () => {
        gtag('event', 'good', { 'event_category': 'rating' });
    });
    ratingBad.addEventListener('click', () => {
        gtag('event', 'bad', { 'event_category': 'rating' });
    });
});