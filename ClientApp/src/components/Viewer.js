import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';
import ReactAce from 'react-ace';

import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';

export class Viewer extends Component {
    static displayName = Viewer.name;

    constructor(props) {
        super(props);
        this.state = {
            receiveText: ''
        };
        this.connection = new SignalR.HubConnectionBuilder().withUrl("/shareHub").build();
        this.connection.on('ReceiveMessage', message => {
            this.setState({ receiveText: message });
        });
        this.connection.start().then(() => {
            console.log('connected');
        }).catch(err => {
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
                    value={this.state.receiveText}
                >
                </ReactAce>
            </div>
        )
    }
}