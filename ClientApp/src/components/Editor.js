import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';
import ReactAce from 'react-ace';
import { Select, MenuItem, InputLabel, FormControl, Grid, Button } from '@material-ui/core'

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
        { name: 'C/C++', value: 'c_cpp', compiler: 'gcc-head' },
        { name: 'C#', value: 'csharp', compiler: 'dotnetcore-head' },
        { name: 'Java', value: 'java', compiler: 'openjdk-head' },
        { name: 'Python', value: 'python', compiler: 'cpython-head' },
        { name: 'PHP', value: 'php', compiler: 'php-head' },
        { name: 'Ruby', value: 'ruby', compiler: 'ruby-head' },
        { name: 'Go', value: 'golang', compiler: 'go-head' },
        { name: 'HTML', value: 'html' },
        { name: 'CSS', value: 'css' },
        { name: 'JavaScript', value: 'javascript', compiler: 'nodejs-head' },
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
            code: '',
            console: ''
        };
        this.execCodeBinded = this.execCode.bind(this);
        this.connection = new SignalR.HubConnectionBuilder().withUrl("/shareHub").build();
        this.connection.start().then(() => {
            console.log('connected');
        }).catch(err => {
            console.error(err);
        });
    }

    sendText(sendText) {
        this.setState({ code: sendText });
        this.connection.invoke("SendMessage", JSON.stringify({
            type: 'code',
            data: sendText
        })).catch(err => {
            console.error(err);
        });
    }
    sendMode(mode) {
        this.setState({ mode: mode });
        this.connection.invoke("SendMessage", JSON.stringify({
            type: 'mode',
            data: mode
        })).catch(err => {
            console.error(err);
        });
    }
    async execCode() {
        const compiler = this.langList.find(l => l.value === this.state.mode).compiler;
        if (compiler) {
            const res = await fetch('https://wandbox.org/api/compile.json', {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: this.state.code,
                    compiler: compiler,
                    stdin: ''
                })
            });
            const json = await res.json();
            const current = new Date();
            this.setState(state => {
                return { console: `[${current.toTimeString().split(' ')[0]}] > ${json.program_output}${state.console}` }
            });
        }
    }
    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id='lang-select-label'>言語</InputLabel>
                                <Select
                                    labelId='lang-select-label'
                                    id='lang-select'
                                    value={this.state.mode}
                                    onChange={e => this.sendMode(e.target.value)}
                                >
                                    {this.langList.map(l => <MenuItem key={l.value} value={l.value}>{l.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id='theme-select-label'>テーマ</InputLabel>
                                <Select
                                    labelId='theme-select-label'
                                    id='theme-select'
                                    value={this.state.theme}
                                    onChange={e => this.setState({ theme: e.target.value })}
                                >
                                    {this.themeList.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={2}>
                            <Button fullWidth color='primary' variant='contained' onClick={this.execCodeBinded}>▶ 実行</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{
                    marginTop: '8px'
                }}>
                    <ReactAce
                        width='100%'
                        height='460px'
                        mode={this.state.mode}
                        theme={this.state.theme}
                        onChange={v => this.sendText(v)}
                        value={this.state.code}
                        setOptions={{
                            useWorker: false
                        }}
                    >
                    </ReactAce>
                </Grid>
                <Grid item xs={12} style={{
                    marginTop: '8px'
                }}>
                    <InputLabel>標準出力</InputLabel>
                    <ReactAce
                        width='100%'
                        height='140px'
                        mode='plain_text'
                        theme='terminal'
                        setOptions={{
                            showLineNumbers: false
                        }}
                        value={this.state.console}
                    ></ReactAce>
                </Grid>
            </Grid>
        )
    }
}