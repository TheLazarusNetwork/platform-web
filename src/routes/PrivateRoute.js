import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return auth.isSessionActive() ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect to="/signup" />
      );
    }}
  />
);

export default PrivateRoute;
