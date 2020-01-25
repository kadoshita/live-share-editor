import React, { Component } from 'react';
import { Grid, Button, Paper, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faShareSquare, faCode, faTerminal } from '@fortawesome/free-solid-svg-icons';

export class Home extends Component {
  static displayName = Home.name;
  constructor(props) {
    super(props);
    this.state = {
      isHoverItem1: false,
      isHoverItem2: false,
      isHoverItem3: false
    };
  }

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
              <Paper elevation={4} onMouseOver={() => this.setState({ isHoverItem1: true })} onMouseLeave={() => this.setState({ isHoverItem1: false })}>
                <h3>コーディングをリアルタイムで配信・共有</h3>
                <div className='hover-item-parent'>
                  <FontAwesomeIcon icon={faShareSquare} color='#55B2B8' className='hover-item-icon' fixedWidth size='9x'></FontAwesomeIcon>
                  <Fade in={this.state.isHoverItem1} className='hover-item-fade'>
                    <div><p>ASP.NET Core SignalRにより、低遅延でコーディングを配信・共有できます。</p></div>
                  </Fade>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={4} onMouseOver={() => this.setState({ isHoverItem2: true })} onMouseLeave={() => this.setState({ isHoverItem2: false })}>
                <h3>12言語・10カラーテーマに対応</h3>
                <div className='hover-item-parent'>
                  <FontAwesomeIcon icon={faCode} color='#F8BBD0' className='hover-item-icon' fixedWidth size='9x'></FontAwesomeIcon>
                  <Fade in={this.state.isHoverItem2} className='hover-item-fade'>
                    <div><p>C/C++、C#、Java、Python、PHP、Ruby、Go、JavaScript等、多数の言語のシンタックスハイライトが使用できます。</p></div>
                  </Fade>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={4} onMouseOver={() => this.setState({ isHoverItem3: true })} onMouseLeave={() => this.setState({ isHoverItem3: false })}>
                <h3>ブラウザ上で実行結果を確認</h3>
                <div className='hover-item-parent'>
                  <FontAwesomeIcon icon={faTerminal} color='#55B2B8' className='hover-item-icon' fixedWidth size='9x'></FontAwesomeIcon>
                  <Fade in={this.state.isHoverItem3} className='hover-item-fade'>
                    <div>
                      <p><a href='https://wandbox.org' target='_blank' rel='noopener noreferrer'>Wandbox</a>のWebAPIを使用して、書いたコードの実行結果をブラウザ上で確認できます。</p>
                    </div>
                  </Fade>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ height: '64px', textAlign: 'right' }}>
          <a href='https://github.com/kadoshita/live-share-editor' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGithub} size='3x'></FontAwesomeIcon>
          </a>
          <a href='https://twitter.com/intent/tweet?text=ソースコードをリアルタイムで共有できるオンラインエディタ - Live Share Editor&url=https%3A%2F%2Flive-share-editor.azurewebsites.net' target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faTwitter} size='3x'></FontAwesomeIcon>
          </a>
        </Grid>
      </Grid >
    );
  }
}
