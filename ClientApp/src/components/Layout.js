import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { ThemeProvider } from '@material-ui/core/styles';
import MainTheme from '../theme';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <ThemeProvider theme={MainTheme}>
          <NavMenu />
          <Container>
            {this.props.children}
          </Container>
        </ThemeProvider>
      </div>
    );
  }
}
