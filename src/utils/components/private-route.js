import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import PropTypes from 'prop-types'

export const PrivateRoute = ({ children, path, isAuth }) => (
    <Route path={path} exact>
      {isAuth ? children : <Redirect to="/" />}
    </Route>
)

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
  isAuth: PropTypes.bool.isRequired
}
