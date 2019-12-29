import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';
import ReactAce from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-plain_text';

import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-cobalt';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-chrome';
import 'ace-builds/src-noconflict/theme-eclipse';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-dreamweaver';

export class Editor extends Component {
    static displayName = Editor.name;
    langList = [
        { name: 'C/C++', value: 'c_cpp' },
        { name: 'C#', value: 'csharp' },
        { name: 'Java', value: 'java' },
        { name: 'Python', value: 'python' },
        { name: 'PHP', value: 'php' },
        { name: 'Ruby', value: 'ruby' },
        { name: 'Go', value: 'golang' },
        { name: 'HTML', value: 'html' },
        { name: 'CSS', value: 'css' },
        { name: 'JavaScript', value: 'javascript' },
        { name: 'Markdown', value: 'markdown' },
        { name: 'Plain Text', value: 'plain_text' }
    ];
    themeList = [
        'monokai',
        'cobalt',
        'terminal',
        'twilight',
        'chrome',
        'eclipse',
        'github',
        'textmate',
        'xcode',
        'dreamweaver'
    ];
    constructor(props) {
        super(props);
        this.state = {
            mode: 'c_cpp',
            theme: 'monokai',
            code: ''
        };
        this.sendTextBinded = this.sendText.bind(this);
        this.connection = new SignalR.HubConnectionBuilder().withUrl("/shareHub").build();
        this.connection.start().then(() => {
            console.log('connected');
        }).catch(err => {
            console.error(err);
        });
    }

    sendText(sendText) {
        this.setState({ code: sendText });
        this.connection.invoke("SendMessage", sendText).catch(err => {
            console.error(err);
        });
    }
    render() {
        return (
            <div>
                <label>言語:
                    <select onChange={e => this.setState({ mode: e.target.value })}>
                        {this.langList.map(l => <option key={l.value} value={l.value}>{l.name}</option>)}
                    </select>
                </label>
                <label>テーマ:
                    <select onChange={e => this.setState({ theme: e.target.value })}>
                        {this.themeList.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                </label>
                <ReactAce
                    width='100%'
                    mode={this.state.mode}
                    theme={this.state.theme}
                    onChange={v => this.sendTextBinded(v)}
                    value={this.state.code}
                    setOptions={{
                        useWorker: false
                    }}
                >
                </ReactAce>
            </div>
        )
    }
}