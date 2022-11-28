import { rest } from 'msw'
import { ADMIN_ROLE } from '../constants/roles'
import { HTTP_INVALID_CREDENTIAL_ERROR, HTTP_OK } from '../constants/statusHttp'

export const handlers = [
  // Handles a POST /login request
  rest.post('/login', (req, res, ctx) => {
    sessionStorage.setItem('is-authenticated', 'true')
    // ctx.json is the api response
    let role = ''

    const { email } = req.body
    if (email === 'admin@mail.com') {
      role = ADMIN_ROLE
    }
    return res(
      ctx.status(200), ctx.json({ user: { role, username: 'John Doe' } }))
  })
]
export const handlerInvalidCredentials = ({ wrongPassword, wrongEmail }) =>
  rest.post('/login', (req, res, ctx) => {
    const { email, password } = req.body

    if (email === wrongEmail && password === wrongPassword) {
      return res(
        ctx.status(HTTP_INVALID_CREDENTIAL_ERROR),
        ctx.json({ message: 'The email or password are not correct' })
      )
    }

    return res(ctx.status(HTTP_OK))
  })
export default handlers
