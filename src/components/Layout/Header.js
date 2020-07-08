import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Grid} from '@material-ui/core'

import { useAuth0 } from "../../auth/react-auth0-wrapper";

function Header() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <AppBar position='static'>
      <Toolbar>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          <Link to='/'>
            <Typography variant='h2'>hallway</Typography>
          </Link>
        </Grid>
        <Grid item>
          {!isAuthenticated && (
            <>
              <Button
                variant='outlined'
                color='secondary'
                size='large'
                onClick={() => loginWithRedirect({})}
              >Login</Button>
            </>
          )}

          {isAuthenticated && (
            <>
              <Button
                variant='outlined'
                color='secondary'
                size='large'
                onClick={() => logout({})}
              >Logout</Button>
            </>
          )}
        </Grid>
      </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;