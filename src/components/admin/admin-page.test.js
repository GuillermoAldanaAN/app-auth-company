import React from 'react'
import { screen, render } from '@testing-library/react'
import AdminPage from './admin-page'

import { AuthContext } from '../../contexts/auth-context'

describe('when login page is mount', () => {
  it('must display the login title and admin username', () => {
    render(
      <AuthContext.Provider value={{ user: { username: 'John Doe' } }}>
        <AdminPage />
      </AuthContext.Provider>
    )
    expect(screen.getByText(/john doe/i)).toBeInTheDocument()
  })
})
