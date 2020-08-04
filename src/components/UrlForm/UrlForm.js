import React, { Component } from 'react';
import { submitUrl } from '../../apiCalls'

class UrlForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      urlToShorten: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = (e, url, title) => {
    this.props.handleSubmit(e, url, title)
    this.clearInputs()
  }
  clearInputs = () => {
    this.setState({title: '', urlToShorten: ''});
  }
  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={this.state.urlToShorten}
          onChange={e => this.handleNameChange(e)}
        />

        <button onClick={e => this.handleSubmit(e, this.state.urlToShorten, this.state.title)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
