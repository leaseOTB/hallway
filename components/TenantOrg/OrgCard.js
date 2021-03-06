import React from "react";
import gql from "graphql-tag"

import { useQuery } from "@apollo/react-hooks";
import { timeDifferenceForDate } from "../../lib/TimeDifference.js";

import {Grid, Card, CardActionArea, CardContent, Typography } from '@material-ui/core'

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

function OrgCard(props) {
  let orgId = props.id ? props.id : props.match.params.id;

  const { loading, error, data } = useQuery(ORG_INFO, {
    variables: { id: orgId }
  });



  if (loading) return "";
  if (error) return `Error! ${error.message}`;


  return (
    <>
        {data.orgs.map((org, index) => (
          <Grid item xs={6} key={index} style={{padding: '2em'}}>
            <Card>
            <CardActionArea href={`/organizations/${org.id}`}>
            <CardContent>
            <Typography>
              {org.name}

            </Typography>
            </CardContent>

            <hr/>

            {org.description}
            <hr/>
            {org.user.name}

            <hr/>
            {timeDifferenceForDate(org.created_at)}
            </CardActionArea>
            </Card>
          </Grid>
        ))}
    </>
  );
}

export default OrgCard;