import React, { Component } from 'react';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    querry: '',
  };

  handleSubmit = ( data) => {
    this.setState({querry:data})
  };

  render() {
    return <Searchbar onSubmit={this.handleSubmit}></Searchbar>;
  }
}

export default App;
