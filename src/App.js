import React from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import './App.css'
import AppRouter from './routers/app-router'

function App () {
  return (
    <Router >
      <AppRouter></AppRouter>
    </Router>

  )
}

export default App
