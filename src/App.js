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
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AnonymousVPN from "./pages/services/AnonymousVPN";
import DedicatedVPN from "./pages/services/DedicatedVPN";
import Tunnel from "./pages/services/Tunnel";
const auth = new Auth();
const App = () => {
  return (
    <Router>
      <div className="body">
        <PrivateRoute
          appwrite={auth.sdk}
          path="/"
          auth={auth}
          component={Sidebar}
        />
        <Switch>
          <Route exact path="/" auth={auth} component={Home} />
          <Route exact path="/profile" auth={auth} component={Profile} />
          <Route exact path="/billing" auth={auth} component={Billing} />
          <Route exact path="/settings" auth={auth} component={Settings} />
          <Route exact path="/anomvpn" auth={auth} component={AnonymousVPN} />
          <Route exact path="/dedivpn" auth={auth} component={DedicatedVPN} />
          <Route exact path="/tunnel" auth={auth} component={Tunnel} />

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
