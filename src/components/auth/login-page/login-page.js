import React, { useContext, useState } from 'react'
import TextField from '@mui/material/TextField'
import { Avatar, Box, Button, CircularProgress, Container, Snackbar, Typography } from '@mui/material'
import { login } from '../../../services'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Redirect } from 'react-router-dom'
import { ADMIN_ROLE } from '../../../constants/roles'
import { AuthContext } from '../../../contexts/auth-context'
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
  const { handleSuccess, user } = useContext(AuthContext)
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
      const {
        user: { role, username }
      } = await response.json()
      handleSuccess({ role, username })
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

  if (!isFetching && user.role === ADMIN_ROLE) {
    return <Redirect to={'/admin'}/>
  }
  return (
    <Container component={'main'} maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant={'h5'} component='h1'>
          Login page
        </Typography>
        {isFetching && <CircularProgress data-testid='loading-indicator' />}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name='email'
            label="Email"
            onChange={handleChange}
            onBlur={handleBlrEmail}
            helperText={emailValidation}
            value={formValues.email}
            error={!!emailValidation.length}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name='password'
            label="Password"
            type='password'
            onChange={handleChange}
            onBlur={handleBlrPassword}
            helperText={passwordValidation}
            value={formValues.password}
            error={!!passwordValidation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isFetching}>
            Send
          </Button>
        </Box>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errorMessage}
        />
      </Box>
    </Container>

  )
}

export default Login
