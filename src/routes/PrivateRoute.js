import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, auth: auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      
      //if a user is logged in render the given component otherwise redirect to signup
      return localStorage.getItem("auth_state") ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect to="/signup" />
      );
    }}
  />
);

export default PrivateRoute;
