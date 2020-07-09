import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import {Grid, Card, Typography, CircularProgress} from '@material-ui/core'

import OrgCard from "./OrgCard.js"
import { Link } from "react-router-dom";

export const ORG_LIST = gql`
  {
    orgs(order_by: { created_at: desc }) {
      id
    }
  }
`;

function OrgSearch(props) {

  const { loading, error, data } = useQuery(ORG_LIST);

  if (loading) return <CircularProgress/>;
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <Grid container>
        <Link to='/organizations/create'>Create New Tenant Org</Link>
      </Grid>
      <Grid container direction='row'>
        {data.orgs.map((org, index) => (
            <OrgCard id={org.id} key={index}/>
        ))}
      </Grid>
    </>
  );
}

export default OrgSearch