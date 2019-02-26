window.addEventListener('load', () => {
    let langSelect = document.getElementById('lang-select');
    let cursorPosition = document.getElementById('cursor-position');
    let textCount = document.getElementById('text-count');
    let runCode = document.getElementById('run-code');
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

    runCode.addEventListener('click', () => {
        console.log(editor.getValue());
        let postCode = {
            code: editor.getValue(),
            compiler: 'gcc-head'
        };

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            switch (xhr.readyState) {
                case 0:
                    console.log('uninitialized!');
                    break;
                case 1:
                    console.log('loading...');
                    break;
                case 2:
                    console.log('loaded.');
                    break;
                case 3:
                    console.log(`interactive... ${xhr.responseText.length} bytes.`);
                    break;
                case 4:
                    if (xhr.status == 200 || xhr.status == 304) {
                        var data = JSON.parse(xhr.responseText);
                        console.log(`COMPLETE! : ${data}`);
                        alert(`code:${data.status}\nresult:${data.program_output}`);
                    } else {
                        console.log(`Failed. HttpStatus: ${xhr.statusText}`);
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