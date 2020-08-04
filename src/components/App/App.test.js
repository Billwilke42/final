import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App'
import { getUrls, submitUrl } from '../../apiCalls'
import '@testing-library/jest-dom/extend-expect';
jest.mock('../../apiCalls.js')


describe('App', () => {

  getUrls.mockResolvedValue({urls: [{

    id: 1,
    long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
    short_url: 'http://localhost:3001/useshorturl/1',
    title: 'Awesome photo'}]}
    
)
  it('Should render Apps specific UI elements', () => {
    const { getByText } = render(<App />)

    const title = getByText('URL Shortener')

    expect(title).toBeInTheDocument()
  })

  it('Should render urls from the server', async () => {
    const { getByText } = render(<App />)

    const title = await waitFor(() => getByText('Awesome photo'))
    const shortUrl = await waitFor(() => getByText('http://localhost:3001/useshorturl/1'))
    const longUrl = await waitFor(() => getByText('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80'))
    expect(title).toBeInTheDocument()
    expect(shortUrl).toBeInTheDocument()
    expect(longUrl).toBeInTheDocument()
  })

  it('Should have a form that user can fill out that updates the DOM', async () => {
    const { getByRole, getByText, getByPlaceholderText } = render(<App />)
    
    const titleInput = getByPlaceholderText('Title...') 
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const submitBtn = getByRole('button', {name: 'Shorten Please!'}) 
    const title = await waitFor(() => getByText('Awesome photo'))
    const anchorTag = await waitFor(() => getByText('http://localhost:3001/useshorturl/1'))
    expect(title).toBeInTheDocument()
    expect(anchorTag).toBeInTheDocument()
    
    fireEvent.change(titleInput, {target: {value: 'Mock Title Value'}})
    fireEvent.change(urlInput, {target: {value: 'Mock Url Value'}})
    getUrls.mockResolvedValueOnce({urls: [
      {
        id: 1,
        long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Awesome photo'
      },{
        id: 2,
        long_url: 'Mock Url Value',
        short_url: 'http://localhost:3001/useshorturl/1',
        title: 'Mock Title Value'
      }
    ]}
    )
    fireEvent.click(submitBtn)
    submitUrl.mockReturnValueOnce( {id: 2,
      long_url: 'Mock Url Value',
      short_url: 'http://localhost:3001/useshorturl/1',
      title: 'Mock Title',
      error: null,
    })
    
    const urlValue = await waitFor(() => getByText('Mock Url Value'))
    const titleValue = await waitFor(() => getByText('Mock Title Value'))
    // await waitFor()
  })



})