import React from 'react' 
import {gql} from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'

import {Grid, Card, Typography, CircularProgress} from '@material-ui/core'

import OrgChat from './OrgChat'


export const ORG_INFO = gql`
  query($id: Int!) {
    orgs(where: { id: { _eq: $id } }) {
      id
      name
      description
      created_at
      user {
        name
      }
    }
  }
`;

const OrgDashboard = () => {
  let {id} = 2

  const {loading, error, data} = useQuery(ORG_INFO, {
    variables: { id: id}
  })

  if (loading) return <CircularProgress />
  if (error) return `Error! ${error.message}`
  return (
    <>
      <Grid container direction='row'>
        <Grid item container direction='column' xs={4}>
          <Grid item>
            <Typography variant='h1'>
            {data.orgs[0].name}      
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h4'>
            Admin - {data.orgs[0].user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction='column' xs={4}>
          <OrgChat id={data.orgs[0].id} />
        </Grid>
      </Grid>
    </>
  )
}

export default OrgDashboard