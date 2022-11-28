import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import LoginPage from '../components/auth/login-page'
import { PrivateRoute } from '../utils/components/private-route'
import AdminPage from '../components/admin'
import EmployeePage from '../components/employee'

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin" >
          <AdminPage />
        </PrivateRoute>
        <PrivateRoute path="/employee">
          <EmployeePage />
        </PrivateRoute>
      </Switch>
    </Router>
  )
}

export default AppRouter
