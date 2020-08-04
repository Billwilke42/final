import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlForm from './UrlForm'
import { submitUrl } from '../../apiCalls';

describe('UrlForm', () => {
  it('Should render the correct elements', () => {
    const { getByRole, getByPlaceholderText } = render(<UrlForm />)
  
    const titleInput = getByPlaceholderText('Title...') 
    const urlInput = getByPlaceholderText('URL to Shorten...') 
    const submitBtn = getByRole('button', {name: 'Shorten Please!'}) 

    expect(titleInput).toBeInTheDocument()
    expect(urlInput).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  it('Should have inputs that hold the correct value', () => {
    const { getByDisplayValue, getByPlaceholderText } = render(<UrlForm />)
  
    const titleInput = getByPlaceholderText('Title...') 
    const urlInput = getByPlaceholderText('URL to Shorten...') 

    fireEvent.change(titleInput, {target: {value: 'Mock Title Value'}})
    fireEvent.change(urlInput, {target: {value: 'Mock Url Value'}})

    const titleValue = getByDisplayValue('Mock Title Value')
    const urlValue = getByDisplayValue('Mock Url Value')

    expect(titleValue).toBeInTheDocument()
    expect(urlValue).toBeInTheDocument()
  })

  it('Should call the right method on submit', () => {
    const mockGetAllUrls = jest.fn()
    const { getByRole, getByPlaceholderText } = render(<UrlForm getAllUrls={mockGetAllUrls}/>)
  
    const titleInput = getByPlaceholderText('Title...') 
    const urlInput = getByPlaceholderText('URL to Shorten...')
    const submitBtn = getByRole('button', {name: 'Shorten Please!'}) 

    fireEvent.change(titleInput, {target: {value: 'Mock Title Value'}})
    fireEvent.change(urlInput, {target: {value: 'Mock Url Value'}})
    fireEvent.click(submitBtn)

    expect(mockGetAllUrls).toHaveBeenCalledTimes(1)
  })
})