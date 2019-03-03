window.addEventListener('load', () => {
    let langSelect = document.getElementById('lang-select');
    let cursorPosition = document.getElementById('cursor-position');
    let textCount = document.getElementById('text-count');
    let runCode = document.getElementById('run-code');
    let socket = io();
    let editor = ace.edit('editor');

    const wandboxSupportLang = {
        c_cpp: 'gcc-head',
        csharp: 'mono-head',
        java: 'openjdk-head',
        python: 'cpython-head',
        php: 'php-head',
        ruby: 'ruby-head',
        golang: 'go-head',
        javascript: 'nodejs-head'
    };

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

    runCode.addEventListener('click', () => {
        let stdInput = document.getElementById('std-input');
        let runResult = document.getElementById('run-result');

        runResult.style.display = 'inline';
        runResult.value = '';
        if (!wandboxSupportLang[langSelect.value]) {
            runResult.value += 'not support language\n';
            return;
        }
        let postCode = {
            code: editor.getValue(),
            compiler: wandboxSupportLang[langSelect.value],
            stdin: stdInput.value
        };

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            switch (xhr.readyState) {
                case 0:
                    runResult.value += 'uninitialized!\n';
                    break;
                case 1:
                    runResult.value += 'loading...\n';
                    break;
                case 2:
                    runResult.value += 'loaded.\n';
                    break;
                case 3:
                    runResult.value += `interactive... ${xhr.responseText.length} bytes.\n`;
                    break;
                case 4:
                    if (xhr.status == 200 || xhr.status == 304) {
                        var data = JSON.parse(xhr.responseText);
                        runResult.value += `code:${data.status}\nresult:${data.program_output}\n`;
                    } else {
                        console.error(`Failed. HttpStatus: ${xhr.statusText}`);
                    }
                    break;
            }
        };

        xhr.open('POST', 'https://wandbox.org/api/compile.json', false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(postCode));
        xhr.abort();
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