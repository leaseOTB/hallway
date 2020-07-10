import Router from 'next/router'

import { Button, Modal, Typography } from '@material-ui/core'

const Login = () => {
  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open
    >
      <Grid>
        <Typography>Welcome to Lease on the Block!</Typography>
        <br/>
        <Typography>Please Login to Continue</Typography>
        <Button onClick={() => { Router.push('/api/login')}}>Login</Button>
      </Grid>
    </Modal>
  )
}

export default Login