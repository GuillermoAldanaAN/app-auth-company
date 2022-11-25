import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
// Render the route depend parameter
export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return { ...render(ui, { wrapper: Router }) }
}
