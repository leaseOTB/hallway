  
import React, { useState } from 'react'
import gql from "graphql-tag"
import { useMutation } from '@apollo/react-hooks'
import {Button, Typography, Grid, CircularProgress} from '@material-ui/core'

import { ORG_LIST } from './OrgSearch.js';
import { useFetchUser } from '../../lib/user'

const CREATE_ORG = gql`
  mutation($name: String!, $description: String!, $userId: String!) {
    insert_orgs(objects: { name: $name, description: $description, admin_id: $userId }) {
      affected_rows
    }
  }
`;



function OrgCreate() {

  const { user, loading } = useFetchUser();

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');

  const [createOrg] = useMutation(CREATE_ORG);

  if (loading) return <CircularProgress />

  return (
    <>
      <Typography>Create</Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          // checks if the url points to a valid image
          
            createOrg({
              variables: { name, description, userId: user.sub},
              refetchQueries: [
                { query: ORG_LIST },
              ],
            }).catch(function(error) {
              console.log(error);
              setError(error.toString());
            });
          
          //You are having a controlled component where input value is determined by this.state._variable_name.
          // So once you submit you have to clear your state which will clear your input automatically.
          setDescription('');
          setName('');
        }}
      >
      <Grid container>
        <Grid item xs={12}>
          <span>Enter a NAME:</span>
          <br/>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type='text'
          />
        </Grid>
        <Grid item xs={12}>
          <span>description-</span>
          <br/>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            type='text'
          />
        </Grid>
        <Button
            variant='outlined'
            type='submit'
            value='Submit'
          >
            Submit
          </Button>
      </Grid>


        {error}
      </form>            
    </>
  );
}

export default OrgCreate;