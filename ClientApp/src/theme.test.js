import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { ThemeProvider } from '@material-ui/core/styles';
import MainTheme from './theme';

let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('set theme', () => {
    act(() => {
        render(<ThemeProvider theme={MainTheme}><p id='test'>test</p></ThemeProvider>, container);
    });
    expect(container.innerHTML).not.toBe('');
    expect(document.getElementById('test').textContent).toBe('test');
});