import React from 'react'

import { Link } from 'react-router-dom'

import {Grid, Typography, Button, Card} from '@material-ui/core'

const Landing = () => {
  return (
    <Grid>
      <Grid item>
        <Link to='/organizations'>
        <Button>
          Search Tennat Organizations
        </Button>
        </Link>
      </Grid>
      <Grid item>
        <Link to='/tenan'>
        <Button>
          Search Tennat Organizations
        </Button>
        </Link>
      </Grid>
    </Grid>
  )
}

export default Landing