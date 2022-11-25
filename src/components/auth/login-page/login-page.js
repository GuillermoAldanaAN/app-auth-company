import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button, CircularProgress, Snackbar } from '@mui/material'
import { login } from '../../../services'

const passwordMessage = 'The password must contain at least 8 characters, one upper case letter, one number and one special character'
const validateEmail = (email) => {
  const regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

  return regex.test(email)
}
const validatePassword = password => {
  const passwordRulesRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

  return passwordRulesRegex.test(password)
}
const Login = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [emailValidation, setEmailValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const [isFetching, setIsFetching] = useState(false)
  const validateForm = () => {
    const { email, password } = formValues
    const isEmailEmpty = !email
    const isPasswordEmpty = !password

    if (isEmailEmpty) setEmailValidation('The email is required')
    if (isPasswordEmpty) setPasswordValidation('The password is required')
    return isPasswordEmpty || isEmailEmpty
  }
  const handleSubmit = async (e) => {
    const { email, password } = formValues
    try {
      e.preventDefault()
      if (validateForm()) {
        return
      }
      setIsFetching(true)
      const response = await login({ email, password })
      if (!response.ok) { throw response }
    } catch (error) {
      const data = await error.json()
      setErrorMessage(data.message)
      setIsOpen(true)
    } finally {
      setIsFetching(false)
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  const handleBlrEmail = () => {
    if (!validateEmail(formValues.email)) {
      setEmailValidation('The email is invalid. Example:john.doe@mail.com')
    } else {
      setEmailValidation('')
    }
  }
  const handleBlrPassword = () => {
    if (!validatePassword(formValues.password)) {
      setPasswordValidation(passwordMessage)
    } else {
      setPasswordValidation('')
    }
  }
  const handleClose = () => setIsOpen(false)
  return (
        <React.Fragment>
            <h1>
                Login page
            </h1>
            {isFetching && <CircularProgress data-testid='loading-indicator'/>}
            <form onSubmit={handleSubmit}>
                <TextField
                    id="email"
                    name='email'
                    label="email"
                    onChange={handleChange}
                    onBlur={handleBlrEmail}
                    helperText={emailValidation}
                    value={formValues.email}
                />
                <TextField
                    id="password"
                    name='password'
                    label="password"
                    type='password'
                    onChange={handleChange}
                    onBlur={handleBlrPassword}
                    helperText={passwordValidation}
                    value={formValues.password}
                />
                <Button variant='contained' type='submit' disabled={isFetching}>
                    Send
                </Button>
            </form>
            <Snackbar
              open={isOpen}
              autoHideDuration={6000}
              onClose={handleClose}
              message={errorMessage}
            />
        </React.Fragment>

  )
}

export default Login
