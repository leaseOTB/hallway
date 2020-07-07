
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

import SecuredRoute from './SecuredRoute';
import '../styles/App.css';
import Header from './Header.js';
import OrgSearch from './TenantOrg/OrgSearch.js';
import OrgCreate from './TenantOrg/OrgCreate.js';
import { useAuth0 } from '../auth/react-auth0-wrapper';


function App() {
  const { isAuthenticated, user } = useAuth0();

  // used state to get accessToken through getTokenSilently(), the component re-renders when state changes, thus we have
  // our accessToken in apollo client instance.
  const [accessToken, setAccessToken] = useState('');

  const { getTokenSilently, loading } = useAuth0();
  if (loading) {
    return 'Loading...';
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
      <Header />
      {isAuthenticated && <OrgCreate />}
      <Switch>
        <Route exact path='/' component={OrgSearch} />
        <SecuredRoute path='/create' component={OrgCreate} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
