import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import PropTypes from 'prop-types'
import LoginPage from '../components/auth/login-page'
import { PrivateRoute } from '../utils/components/private-route'
import AdminPage from '../components/admin'
import EmployeePage from '../components/employee'

const AppRouter = ({ isAuth }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin" isAuth={isAuth}>
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute path="/employee" isAuth={isAuth}>
          <EmployeePage />
        </PrivateRoute>
      </Switch>
    </React.Fragment>
  )
}
AppRouter.propTypes = {
  isAuth: PropTypes.bool.isRequired
}
AppRouter.defaultProps = {
  isAuth: false
}
export default AppRouter
