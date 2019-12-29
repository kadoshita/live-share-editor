import React, { Component } from 'react'

export class Viewer extends Component {
    static displayName = Viewer.name;

    constructor(props) {
        super(props);
        this.state = {
            receiveText: ''
        };
    }

    render() {
        return (
            <div>
                <p>{this.state.receiveText}</p>
            </div>
        )
    }
}