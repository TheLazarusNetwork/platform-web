import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import Auth from "./api/Auth";
import Success from "./pages/redirects/Success";
import Failure from "./pages/redirects/Failure";
import VerificationPage from "./pages/redirects/VerificationPage";

const auth = new Auth();
const App = () => {
  return (
    <Router>
      <div>
        <PrivateRoute
          appwrite={auth.sdk}
          exact
          path="/"
          auth={auth}
          component={Dashboard}
        />

        <Route
          exact
          path="/signup"
          render={(props) => {
            return localStorage.getItem("auth_state") ? (
              <Redirect to="/" />
            ) : (
              <Signup {...props} auth={auth} />
            );
          }}
        />
        <Route
          exact
          path="/failure"
          render={(props) => <Failure {...props} auth={auth} />}
        />
        <Route
          exact
          path="/success"
          render={(props) => <Success {...props} auth={auth} />}
        />
        <Route
          exact
          path="/verify"
          render={(props) => <VerificationPage {...props} auth={auth} />}
        />
      </div>
    </Router>
  );
};

export default App;
