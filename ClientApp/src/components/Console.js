import React, { Component } from 'react'
import * as SignalR from '@microsoft/signalr';
import ReactAce from 'react-ace';
import { Grid } from '@material-ui/core';
import InputDialog from './InputDialog';
import Common from '../common';

import 'ace-builds/src-noconflict/mode-plain_text';

import 'ace-builds/src-noconflict/theme-terminal';

export class Console extends Component {
    static displayName = Console.name;

    constructor(props) {
        super(props);
        this.state = {
            mode: 'plain_text',
            theme: 'terminal',
            receiveText: '',
            sessionId: '',
            showSessionIdInputDialog: false
        };
        this.togglInputDialogBinded = this.togglInputDialog.bind(this);
        this.setSessionIdBinded = this.setSessionId.bind(this);
        this.connection = new SignalR.HubConnectionBuilder().withUrl("/shareHub").build();
        this.connection.on('ReceiveMessage', message => {
            const msg = JSON.parse(message);
            if (msg.type === 'console') {
                this.setState({ receiveText: msg.data });
            }
        });
        this.connection.start().then(() => {
            console.log('connected');
            const queryParameters = Common.parseQueryString();
            if ('session' in queryParameters) {
                this.connection.invoke('JoinGroup', { sessionId: queryParameters.session, isEditor: false });
                this.setState({ sessionId: queryParameters.session });
            } else {
                console.warn('not set session id');
                this.setState({ showSessionIdInputDialog: true });
            }
        }).catch(err => {
            console.error(err);
        });
    }

    togglInputDialog(open = false, joinSession = false) {
        this.setState({ showSessionIdInputDialog: open }, () => {
            if (joinSession) {
                window.history.replaceState('', '', `${window.location.origin}/Console?session=${this.state.sessionId}`);
                this.connection.invoke('JoinGroup', { sessionId: this.state.sessionId, isEditor: false });
            }
        });
    }
    setSessionId(sessionId) {
        this.setState({ sessionId: sessionId });
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <ReactAce
                        width='100%'
                        mode='plain_text'
                        theme='terminal'
                        value={this.state.receiveText}
                        readOnly={true}
                        setOptions={{
                            useWorker: false
                        }}
                    >
                    </ReactAce>
                </Grid>
                <InputDialog
                    title='セッションID'
                    show={this.state.showSessionIdInputDialog}
                    label='セッションID'
                    onChangeInput={this.setSessionIdBinded}
                    togglOpen={this.togglInputDialogBinded}
                    okButtonTitle='OK'
                    cancelButtonTitle='キャンセル'
                    rowCount={1}
                ></InputDialog>
            </Grid>
        )
    }
}