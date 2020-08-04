import React, { Component } from 'react';
import './App.css';
import { getUrls, submitUrl, deleteUrl } from '../../apiCalls';
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

  handleDelete = async ( id) => {
    await deleteUrl(id)
    this.getAllUrls()
  }

  handleSubmit = async (e, url, title) => {
    e.preventDefault()
    await submitUrl(url, title)
    this.getAllUrls()
  }


  componentDidMount() {
    this.setState({isLoading: true})
    this.getAllUrls()
  }

  render() {
    const { urls, isLoading } = this.state
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm handleSubmit={this.handleSubmit} />
        </header>

        <UrlContainer urls={this.state.urls} deleteUrl={this.handleDelete}/>
      </main>
    );
  }
}

export default App;
