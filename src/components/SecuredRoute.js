import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useAuth0 } from "../auth/react-auth0-wrapper";

import {CircularProgress} from '@material-ui/core'


function SecuredRoute(props) {
  const {component: Component, path} = props;
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  return (
    <Route path={path} render={() => {
        if (!isAuthenticated) {
          // loginWithRedirect({});
          return <Redirect to='/' />;
        }
        return <Component />
    }} />
  );
}

export default SecuredRoute;
