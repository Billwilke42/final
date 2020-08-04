import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlContainer from './UrlContainer'

const mockUrls =   [{
  id: 1,
  long_url: 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
  short_url: 'http://localhost:3001/useshorturl/1',
  title: 'Awesome photo'
}]

describe('UrlContainer', () => {
  it('Should render the heading and anchor tags correctly', () => {
    const { getByText } = render(<UrlContainer urls={mockUrls}/>)
    const title = getByText('Awesome photo')
    const anchorTag = getByText('http://localhost:3001/useshorturl/1')
    expect(title).toBeInTheDocument()
    expect(anchorTag).toBeInTheDocument()
  })
})