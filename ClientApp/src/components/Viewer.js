import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';

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
                <p>{this.state.receiveText}</p>
            </div>
        )
    }
}