import React from "react"
import Link from 'next/link'

import { AppBar, Toolbar, Typography, Grid, CircularProgress} from '@material-ui/core'

import LogoutBtn from '../Auth/Logout'
import {useFetchUser} from '../../lib/user'


const Header = () => {
  let {user, loading} = useFetchUser()

  console.log(user)
  return (
    <AppBar position='static'>
      <Toolbar>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          <Link href='/'>
            <Typography variant='h2'>hallway</Typography>
          </Link>
        </Grid>
        <Grid item>
        {loading ? (
          <CircularProgress color='secondary'/>
        ):(
          <LogoutBtn />
        )}
        </Grid>
      </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header