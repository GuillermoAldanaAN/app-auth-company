import React from 'react'
import { screen, render } from '@testing-library/react'
import AdminPage from './admin-page'

describe('when login page is mount', () => {
  it('must display the login title', () => {
    render(<AdminPage/>)
    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
})
