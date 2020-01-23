import React, { Component } from 'react';
import { Grid, Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareSquare, faCode, faTerminal } from '@fortawesome/free-solid-svg-icons';

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
          <img src='screenshot.png' alt='logo' style={{ width: '100%', height: 'auto', border: '2px solid #F8BBD0' }}></img>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{ textAlign: 'center' }}>
            <Grid item xs={4}>
              <Paper elevation={4}>
                <h3>コーディングをリアルタイムで配信・共有</h3>
                <FontAwesomeIcon icon={faShareSquare} color='#55B2B8' style={{ width: 'auto', height: '140px' }}></FontAwesomeIcon>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={4}>
                <h3>12言語・10カラーテーマに対応</h3>
                <FontAwesomeIcon icon={faCode} color='#F8BBD0' style={{ width: 'auto', height: '140px' }}></FontAwesomeIcon>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={4}>
                <h3>ブラウザ上で実行結果を確認</h3>
                <FontAwesomeIcon icon={faTerminal} color='#55B2B8' style={{ width: 'auto', height: '140px' }}></FontAwesomeIcon>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ height: '64px', textAlign: 'right' }}>
          <a href='https://github.com/kadoshita/live-share-editor' target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faGithub} style={{ height: '100%', width: 'auto', margin: '2px' }}></FontAwesomeIcon></a>
          <a href='https://twitter.com/lz650sss' target='_blank' rel='noopener noreferrer'><FontAwesomeIcon icon={faTwitter} style={{ height: '100%', width: 'auto', margin: '2px' }}></FontAwesomeIcon></a>
        </Grid>
      </Grid >
    );
  }
}
