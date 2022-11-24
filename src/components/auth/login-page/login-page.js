import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

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
  const [emailValidation, setEmailValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements
    if (!email.value) setEmailValidation('The email is required')
    if (!password.value) setPasswordValidation('The password is required')
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
  return (
        <React.Fragment>
            <h1>
                Login page
            </h1>
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
                <Button variant='contained' type='submit'>
                    Send
                </Button>
            </form>

        </React.Fragment>

  )
}

export default Login
