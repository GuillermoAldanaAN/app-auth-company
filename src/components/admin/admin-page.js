import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth-context'

const AdminPage = () => {
  const { user } = useContext(AuthContext)
  return (
    <React.Fragment>
        <h1>Admin Page</h1>
        <p>{user.username}</p>
    </React.Fragment>

  )
}

export default AdminPage
