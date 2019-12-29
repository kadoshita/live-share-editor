import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';

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

    sendText() {
        this.connection.invoke("SendMessage", this.state.sendText).catch(err => {
            console.error(err);
        });
    }
    render() {
        return (
            <div>
                <input type="text" ref="sendText" onChange={e => this.setState({ sendText: e.target.value })}></input>
                <button onClick={this.sendTextBinded}>Send</button>
            </div>
        )
    }
}