import React, { Component } from 'react';
import { TextField, Tooltip } from '@material-ui/core';

class ClipboardText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }
  componentDidMount() {
    const elm = this.elm;

    const Clipboard = this.props.clipboard;

    this.clipboard = new Clipboard(
      elm, {
      target: () => elm
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
        <Tooltip
          title='コピーしました'
          disableFocusListener
          disableHoverListener
          disableTouchListener
          open={this.state.showTooltip}
        >
          <TextField
            type='text'
            value={value}
            InputProps={{ readOnly: true }}
            style={{ width: '50%' }}
            ref={element => { this.elm = element; }}
            onClick={() => { this.setState({ showTooltip: true }, () => { setTimeout(() => { this.setState({ showTooltip: false }) }, 1000) }) }}
          ></TextField>
        </Tooltip>
      </div>
    )
  }
}

export default ClipboardText;