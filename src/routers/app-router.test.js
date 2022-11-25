import React from 'react'
import { screen } from '@testing-library/react'
import AppRouter from './app-router'
import { renderWithRouter } from '../utils/tests'

describe('when the user is not authenticated and enters on admin page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(<AppRouter></AppRouter>, { route: 'admin' })

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
describe('when the user is not authenticated and enters on employee page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(<AppRouter></AppRouter>, { route: 'employee' })
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
describe('when the user is authenticated and enters on amdin page', () => {
  it('must be redirected to login page', () => {
    renderWithRouter(<AppRouter isAuth></AppRouter>, { route: 'admin' })
    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
})
