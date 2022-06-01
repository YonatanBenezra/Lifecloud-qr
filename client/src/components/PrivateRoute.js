import { Redirect, Route } from 'react-router';
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user, myFirebase } = useContext(AuthContext);
  if (myFirebase.loading) {
    return <h2>LO</h2>;
  }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(localStorage.getItem('user')) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
