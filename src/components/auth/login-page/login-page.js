import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'

const Login = () => {
  const [emailValidation, setEmailValidation] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailValidation('The email is required')
    setPasswordValidation('The password is required')
  }
  return (
        <React.Fragment>
            <h1>
                Login page
            </h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="email"
                    label="email"
                    helperText={emailValidation}
                />
                <TextField
                    id="password"
                    label="password"
                    type='password'
                    helperText={passwordValidation}
                />
                <Button variant='contained' type='submit'>
                    Send
                </Button>
            </form>

        </React.Fragment>

  )
}

export default Login
