import React from 'react'
import './App.css'
import AppRouter from './routers/app-router'
import { AuthGuard } from './contexts/auth-guard'
function App () {
  return (
    <AuthGuard>
      <AppRouter></AppRouter>
    </AuthGuard>

  )
}

export default App
