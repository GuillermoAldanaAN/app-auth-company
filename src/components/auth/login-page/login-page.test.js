import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import LoginPage from './login-page'

beforeEach(() => render(<LoginPage/>))
describe('when login page is mount', () => {
  it('must display the login title', () => {
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
  it('The login page must have a form with the following fields: email, password and a submit button.', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()

    // eslint-disable-next-line jest/valid-expect
    expect(screen.getByRole('button', { name: /send/i }))
  })
})

describe('When the user leaves empty fields and clicks the submit button', () => {
  // eslint-disable-next-line jest/expect-expect
  it('display required message: The [field name] is required', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  })
})
