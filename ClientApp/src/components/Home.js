import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#55B2B8' }}>Live Share Editor</h1>
          <h2>ソースコードをリアルタイムで共有できるオンラインエディタ</h2>
          <Link to='/editor'>
            <Button variant='outlined' color='primary'>作業を始める</Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <img src='screenshot.png' alt='logo' style={{ width: '100%', height: 'auto', border: '2px solid #55B2B8' }}></img>
        </Grid>
        <Grid item xs={12}>
          <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
        </Grid>
      </Grid >
    );
  }
}
