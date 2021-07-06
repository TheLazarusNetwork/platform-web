import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return localStorage.getItem("auth_state") ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect to="/signup" />
      );
    }}
  />
);

export default PrivateRoute;
