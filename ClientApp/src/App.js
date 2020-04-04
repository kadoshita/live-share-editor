import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Console } from './components/Console';
import { Viewer } from './components/Viewer';
import { Editor } from './components/Editor';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/console' component={Console} />
        <Route path='/viewer' component={Viewer} />
        <Route path='/editor' component={Editor} />
      </Layout>
    );
  }
}
