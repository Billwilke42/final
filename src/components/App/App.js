import React, { Component } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      urls: [],
      isLoading: false
    }
  }

  getAllUrls = () => {
    this.setState({isLoading: true})
    getUrls()
    .then(data=> this.setState({
      urls: data.urls,
      isLoading: false
    }))
  }

  componentDidMount() {
    this.setState({isLoading: true})
    getUrls()
    .then(data=> this.setState({
      urls: data.urls,
      isLoading: false
    }))
    
  }

  render() {
    const { urls, isLoading } = this.state
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm getAllUrls={this.getAllUrls} />
        </header>

        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
