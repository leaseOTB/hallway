import React from "react";
import gql from "graphql-tag"

import { useQuery } from "@apollo/react-hooks";
import {Grid, Typography, CircularProgress} from '@material-ui/core'

import withPusher from 'react-pusher-hoc'

const OrgChat = ({id, items}) => {
  
  return (
    <div></div>
  )
}

const mapEventsToProps = {
  mapPropsToValues: props => ({
    items: [],
  }),
  events: {
    'itemChannel.add': (item, state, props) => ({
      items: state.items.concat(item),
    }),
  }
};

export default OrgChat