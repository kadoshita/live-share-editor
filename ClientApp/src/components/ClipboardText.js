import React, { Component } from 'react';

class ClipboardText extends Component {
  componentDidMount() {
    const button = this.button
    const input = this.input

    const Clipboard = this.props.clipboard

    this.clipboard = new Clipboard(
      button, {
      target: () => input
    }
    )
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  render() {
    const { value } = this.props

    return (
      <div>
        <input
          ref={element => { this.input = element }}
          type='text'
          value={value}
          readOnly
        />
        <button
          ref={element => { this.button = element }}
        > <img src="clippy.svg" alt="Copy to clipboard" width={12} />
        </button>
      </div>
    )
  }
}

export default ClipboardText;