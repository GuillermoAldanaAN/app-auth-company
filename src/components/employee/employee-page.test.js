import React from 'react'
import { screen, render } from '@testing-library/react'
import EmployeePage from './employee-page'

describe('when login page is mount', () => {
  it('must display the login title', () => {
    render(<EmployeePage></EmployeePage>)
    expect(screen.getByText(/employee page/i)).toBeInTheDocument()
  })
})
