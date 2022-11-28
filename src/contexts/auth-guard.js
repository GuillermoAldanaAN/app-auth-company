import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { AuthContext } from './auth-context'

const AuthGuard = ({ children, isAuth }) => {
  const [isUserAuth, setIsUserAuth] = useState(isAuth)
  const handleSuccess = () => setIsUserAuth(true)
  const authProviderValue = {
    isAuth: isUserAuth,
    handleSuccess
  }
  return (
    <AuthContext.Provider value={authProviderValue}>
      {children}
    </AuthContext.Provider>
  )
}
AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool
}
AuthGuard.defaultProps = {
  isAuth: false
}
export default AuthGuard
