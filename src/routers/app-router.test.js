/* eslint-disable jest/expect-expect */
import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import AppRouter from './app-router'
import { goTo, renderWithAuthProvider, fillsInput, getSendButton } from '../utils/tests'
import { setupServer } from 'msw/node'
import handlers from '../mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

describe('when the user is not authenticated and enters on admin page', () => {
  it('must be redirected to login page', () => {
    goTo('/admin')
    renderWithAuthProvider(<AppRouter ></AppRouter>)

    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
describe('when the user is not authenticated and enters on employee page', () => {
  it('must be redirected to login page', () => {
    goTo('/employee')
    renderWithAuthProvider(<AppRouter/>)
    expect(screen.getByText(/login page/i)).toBeInTheDocument()
  })
})
describe('when the user is authenticated and enters on admin page', () => {
  it('must be redirected to login page', () => {
    goTo('/admin')
    renderWithAuthProvider(<AppRouter></AppRouter>, { isAuth: true })
    expect(screen.getByText(/admin page/i)).toBeInTheDocument()
  })
})
describe('when the admin is authenticated in login page', () => {
  it('must be redirect to admin page', async () => {
    renderWithAuthProvider(<AppRouter/>)
    fillsInput({ email: 'admin@mail.com' })
    fireEvent.click(getSendButton())
    expect(await screen.findByText(/admin page/i)).toBeInTheDocument()
    expect(await screen.findByText(/john doe/i)).toBeInTheDocument()
  })
})
