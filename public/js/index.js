window.addEventListener('load', () => {
    let socket = io();

    let editor = ace.edit('editor');
    editor.setReadOnly(true);
    editor.setTheme('ace/theme/monokai');
    editor.session.setMode('ace/mode/c_cpp');

    socket.on('keyevent', msg => {
        editor.setValue(msg);
    });
    socket.on('changelang', lang => {
        editor.session.setMode(`ace/mode/${lang}`);
    });

    socket.emit('join', location.search.replace('?', '').split('session=')[1]);

    let ratingGood = document.getElementById('rating-good');
    let ratingBad = document.getElementById('rating-bad');

    ratingGood.addEventListener('click', () => {
        gtag('event', 'good', { 'event_category': 'rating' });
    });
    ratingBad.addEventListener('click', () => {
        gtag('event', 'bad', { 'event_category': 'rating' });
    });
});