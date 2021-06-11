import React from "react";
import "./styles/App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import Auth from "./api/Auth";
import Success from "./pages/redirects/Success";
import Failure from "./pages/redirects/Failure";
import VerificationPage from "./pages/redirects/VerificationPage";
import Notfound from "./pages/redirects/404";
import Sidebar from "./Components/Sidebar";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AnonymousVPN from "./pages/services/AnonymousVPN";
import DedicatedNetwork from "./pages/services/DedicatedNetwork";
import Tunnel from "./pages/services/Tunnel";
import Cloud from "./pages/services/Cloud";

const auth = new Auth();

const App = () => {
  return (
    <Router>
      <div className="body">
        <PrivateRoute
          path="/"
          auth={auth}
          component={Sidebar}
        />
        <Switch>
          <PrivateRoute exact path="/" auth={auth} component={Dashboard} />
          <PrivateRoute exact path="/profile" auth={auth} component={Profile} />
          <PrivateRoute exact path="/billing" auth={auth} component={Billing} />
          <PrivateRoute
            exact
            path="/settings"
            auth={auth}
            component={Settings}
          />
          <PrivateRoute
            exact
            path="/anomvpn"
            auth={auth}
            component={AnonymousVPN}
          />
          <PrivateRoute
            exact
            path="/dedivpn"
            auth={auth}
            component={DedicatedNetwork}
          />
          <PrivateRoute exact path="/tunnel" auth={auth} component={Tunnel} />
          <PrivateRoute exact path="/cloud" auth={auth} component={Cloud} />

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
          <Route render={(props) => <Notfound />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
