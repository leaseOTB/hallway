import React from 'react'
import {Button} from '@material-ui/core'
import Router from 'next/router'

const LogoutBtn = ({ logoutHandler }) => (
  <Button onClick={() => Router.push('/api/logout')}>
    Logout
  </Button>
)

export default LogoutBtn