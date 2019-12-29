import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';
import ReactAce from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

export class Editor extends Component {
    static displayName = Editor.name;

    constructor(props) {
        super(props);
        this.state = {
            sendText: ''
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
        this.connection.invoke("SendMessage", sendText).catch(err => {
            console.error(err);
        });
    }
    render() {
        return (
            <div>
                <ReactAce
                    width='100%'
                    mode='c_cpp'
                    theme='monokai'
                    onChange={v => this.sendTextBinded(v)}
                >
                </ReactAce>
            </div>
        )
    }
}