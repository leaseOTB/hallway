import React, { useState } from 'react';

// for authentication using auth0
// for routing
import { Switch, Route } from 'react-router-dom';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';

// for toast notifications
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {CircularProgress} from '@material-ui/core'

import { PusherProvider } from 'react-pusher-hoc'

import Pusher from 'pusher-js'



import SecuredRoute from './SecuredRoute';

import Layout from './Layout/Layout.js';

import Landing from './Landing'

import OrgSearch from './TenantOrg/OrgSearch.js';
import OrgCreate from './TenantOrg/OrgCreate.js';
import OrgDashboard from './TenantOrg/OrgDashboard.js'

import { useAuth0 } from '../auth/react-auth0-wrapper';

const pusherClient = new Pusher(
  process.env.REACT_APP_PUSHER_KEY,
  { auth: {
    headers: {
      'x-domain-token': 'Access-Control-Allow-Origin'
    }
  }}
)

function App() {
  const { isAuthenticated, user } = useAuth0();

  // used state to get accessToken through getTokenSilently(), the component re-renders when state changes, thus we have
  // our accessToken in apollo client instance.
  const [accessToken, setAccessToken] = useState('');

  const { getTokenSilently, loading } = useAuth0();

  if (loading) {
    return (
      <div>

        <CircularProgress/>
      </div>
    )
  }

  // get access token
  const getAccessToken = async () => {
    // getTokenSilently() returns a promise
    try {
      const token = await getTokenSilently();
      setAccessToken(token);
      console.log(token);
    } catch (e) {
      console.log(e);
    }
  };
  getAccessToken();

  // for apollo client
  const httpLink = new HttpLink({
    uri: 'https://profound-troll-67.hasura.app/v1/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    const token = accessToken;
    if (token) {
      return {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`
        }
      };
    } else {
      return {
        headers: {
          ...headers
        }
      };
    }
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  // used for toast notifications
  toast.configure();

  return (
    <ApolloProvider client={client}>
      <PusherProvider value={pusherClient}>
        <Layout>
          <Switch>
            <Route exact path='/' component={Landing} />

            <SecuredRoute exact path='/tenant' />
            <SecuredRoute exact path='/organizer' />

            <Route exact path='/organizations' component={OrgSearch} />
            <SecuredRoute exact path='/organizations/:id' component={OrgDashboard} />
            <SecuredRoute path='/organizations/create' component={OrgCreate} />

          </Switch>
        </Layout>
      </PusherProvider>
    </ApolloProvider>
  );
}

export default App;
