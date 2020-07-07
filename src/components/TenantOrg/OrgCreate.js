  
import React, { useState } from 'react';
import '../../styles/App.css';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import {Button, Typography, Grid} from '@material-ui/core';
import { useAuth0 } from '../../auth/react-auth0-wrapper';
import { toast } from 'react-toastify';
import { ORG_LIST } from './OrgSearch.js';

const CREATE_ORG = gql`
  mutation($name: String!, $description: String!, $userId: String!) {
    insert_orgs(objects: { name: $name, description: $description, admin_id: $userId }) {
      affected_rows
    }
  }
`;



function OrgCreate() {

  const { user } = useAuth0();

  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState('');

  const [createOrg] = useMutation(CREATE_ORG);

  
return (
    <>


        <Typography>Create</Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            // checks if the url points to a valid image
            
              createOrg({
                variables: { description, name, userId: user.sub},
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