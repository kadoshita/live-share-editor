import React, { Component } from 'react'

export class Editor extends Component {
    static displayName = Editor.name;

    constructor(props) {
        super(props);
        this.state = {
            sendText: ''
        };
    }

    render() {
        return (
            <div>
                <p>{this.state.sendText}</p>
            </div>
        )
    }
}