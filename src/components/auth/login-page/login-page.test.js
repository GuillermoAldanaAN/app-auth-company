/* eslint-disable jest/expect-expect */
import React from 'react'
import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import handlers, { handlerInvalidCredentials } from '../../../mocks/handlers'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import LoginPage from './login-page'
import { HTTP_UNEXPECTED_ERROR } from '../../../constants/statusHttp'
import { renderWithRouter, fillsInput, getSendButton } from '../../../utils/tests'
import { AuthContext } from '../../../contexts/auth-context'
const messagePasswordValidation = 'The password must contain at least 8 characters, one upper case letter, one number and one special character'

const getPasswordInput = () => (screen.getByLabelText(/password/i))

const server = setupServer(...handlers)

beforeEach(() => renderWithRouter(
  <AuthContext.Provider value={{ handleSuccess: jest.fn(), user: { role: '' } }}>
    <LoginPage />
  </AuthContext.Provider>)
)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

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

describe('when the user leaves empty fields and clicks the submit button', () => {
  // eslint-disable-next-line jest/expect-expect
  it('display required message: The [field name] is required', () => {
    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText(/the email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/the password is required/i)).toBeInTheDocument()
  })
})
describe('when the user fills empty fields and clicks the submit button', () => {
  it('must not display the required message', () => {
    fillsInput()
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.queryByText(/the email is required/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/the password is required/i)).not.toBeInTheDocument()
  })
})
describe('when the user fills and blur the email input with invalid email', () => {
  it('must display a validation message "the email is invalid. Example:john.doe@mail.com', () => {
    // change and blur email input
    const labelEmail = screen.getByLabelText(/email/i)
    fireEvent.change(labelEmail, { target: { value: 'invalid.email' } })
    fireEvent.blur(labelEmail)

    expect(screen.getByText(/the email is invalid. Example:john.doe@mail.com/i)).toBeInTheDocument()
  })
})

describe('when the user fills and blur the email input with invalid email and then focus and change with valid value', () => {
  it('must not display a validation message.', () => {
    // change and blur email input
    const labelEmail = screen.getByLabelText(/email/i)
    fireEvent.change(labelEmail, { target: { value: 'invalid.email' } })
    fireEvent.blur(labelEmail)

    expect(screen.getByText(/the email is invalid. Example:john.doe@mail.com/i)).toBeInTheDocument()

    fireEvent.change(labelEmail, { target: { value: 'john.doe@mail.com' } })
    fireEvent.blur(labelEmail)

    expect(screen.queryByText(/the email is invalid. Example:john.doe@mail.com/i)).not.toBeInTheDocument()
  })
})
describe('when the user fills and blur the password input with a value with 7 character length', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
    one upper case letter, one number and one special character"`, () => {
    const passwordSevenLengthVal = 'asdfghj'

    fireEvent.change(getPasswordInput(), {
      target: { value: passwordSevenLengthVal }
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(messagePasswordValidation)).toBeInTheDocument()
  })
})
describe('when the users fills and blur the password input with a value without one upper case letter', () => {
  it(`must display the validation message "the password must contain at least 8 charaters, 
  one upper case lter, one number, and one special character`, () => {
    const passwordWithoutNumber = 'aiulaxzA'
    fireEvent.change(getPasswordInput(), { target: { value: passwordWithoutNumber } })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(messagePasswordValidation)).toBeInTheDocument()
  })
})
describe('when the users fills and blur the password input with a value without one number', () => {
  it(`must display the validation message "The password must contain at least 8 characters,
    one upper case letter, one number and one special character"`, () => {
    const passwordWithoutSpecialChar = 'asdfghjA1a'

    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutSpecialChar }
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(messagePasswordValidation)).toBeInTheDocument()
  })
})
describe('when the user filss and blur the password input with a invalid value and the the change with valid value and blur again', () => {
  it('must not display the validation message', () => {
    const passwordWithoutSpecialChar = 'asdfghjA1a'
    const validPassword = 'A1sX#20c'
    fireEvent.change(getPasswordInput(), {
      target: { value: passwordWithoutSpecialChar }
    })
    fireEvent.blur(getPasswordInput())

    expect(screen.getByText(messagePasswordValidation)).toBeInTheDocument()
    fireEvent.change(getPasswordInput(), {
      target: { value: validPassword }
    })
    fireEvent.blur(getPasswordInput())
    expect(screen.queryByText(messagePasswordValidation)).not.toBeInTheDocument()
  })
})
describe('when the user submit the login form with valid data', () => {
  it('must disable the submit button while the form page is fetching the data', async () => {
    fillsInput()
    fireEvent.click(getSendButton())
    expect(getSendButton()).toBeDisabled()

    await waitFor(() => expect(getSendButton()).not.toBeDisabled())
  })
  it('must be a loading indicator at thetop tof the form while it is fetching', async () => {
    fillsInput()
    expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument()
    fireEvent.click(getSendButton())
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.getByTestId('loading-indicator'))
  })
})
describe('when the user submit the login form with valid data and there is an unexpected server error', () => {
  it('must display the error message "Unexpected error, please try again" from the api', async () => {
    expect(await screen.queryByText(/Unexpected error, please try again/i)).not.toBeInTheDocument()
    // setup server - config
    server.use(rest.post('/login', (req, res, ctx) => res(ctx.status(HTTP_UNEXPECTED_ERROR), ctx.json({ message: 'Unexpected error, please try again' }))))
    fillsInput()
    fireEvent.click(getSendButton())
    expect(await screen.findByText(/Unexpected error, please try again/i)).toBeInTheDocument()
  })
})

describe('when the user submit the login form with valid data and there is an invalid credentials error', () => {
  it('must display the error message "The email or password are not correct" from the api', async () => {
    const wrongEmail = 'wrong@mail.com'
    const wrongPassword = 'asd321!A'

    server.use(handlerInvalidCredentials({ wrongEmail, wrongPassword }))
    expect(screen.queryByText(/The email or password are not correct/i)).not.toBeInTheDocument()
    fillsInput({ email: wrongEmail, password: wrongPassword })

    fireEvent.click(getSendButton())
    expect(await screen.findByText(/The email or password are not correct/i)).toBeInTheDocument()
  })
})
