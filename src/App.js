import React, { useState, createContext, useEffect } from "react";
import "./styles/App.css";
import "./styles/Dashboard/dashboard.css";
import {
  HashRouter as Router,
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
import RedirectedUrlPage from "./pages/redirects/RedirectedUrlPage";
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
import PasswordReset from "./Components/PasswordReset";
import PasswordUpdate from "./pages/redirects/PasswordUpdate";
import Organisations from "./pages/Organisations";
import { useSelector } from "react-redux";
import "./styles/Themes/lighttheme.css";
import "./styles/Themes/darktheme.css";

const auth = new Auth();

function SessionActive() {
  return auth.isSessionActive();
}

const App = () => {
  const themestate = useSelector((state) => state);
  const [darktheme, setDarktheme] = useState(themestate.theme);

  useEffect(() => {
    if (themestate.theme == "dark") setDarktheme(true);
    else setDarktheme(false);
  }, [themestate]);

  return (
    <Router>
      <div className={darktheme ? "dark-theme" : "light-theme"}>
        <div className="body">
          <PrivateRoute path="/dash/" auth={auth} component={Sidebar} />
          <Switch>
            <PrivateRoute
              exact
              path="/dash/"
              auth={auth}
              component={Dashboard}
            />
            <PrivateRoute
              exact
              path="/dash/profile"
              auth={auth}
              component={Profile}
            />
            <PrivateRoute
              exact
              path="/dash/billing"
              auth={auth}
              component={Billing}
            />
            <PrivateRoute
              exact
              path="/dash/settings"
              auth={auth}
              component={Settings}
            />
            <PrivateRoute
              exact
              path="/dash/anomvpn"
              auth={auth}
              component={AnonymousVPN}
            />

            <PrivateRoute
              exact
              path="/dash/dedivpn"
              auth={auth}
              component={DedicatedNetwork}
            />
            <PrivateRoute
              exact
              path="/dash/tunnel"
              auth={auth}
              component={Tunnel}
            />
            <PrivateRoute
              exact
              path="/dash/cloud"
              auth={auth}
              component={Cloud}
            />
            <PrivateRoute
              exact
              path="/dash/organisations"
              auth={auth}
              component={Organisations}
            />
      
      
            <Route
              exact
              path="/signup"
              render={(props) => {
                return SessionActive() ? (
                  <Redirect to="/dash/" />
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
            <Route
              exact
              path="/resetpassword"
              render={(props) => <PasswordReset auth={auth} />}
            />
            <Route
              exact
              path="/updatepassword"
              render={(props) => <PasswordUpdate auth={auth} />}
            />
            <Route
              path="/"
              render={(props) => <RedirectedUrlPage auth={auth} />}
            />
            <Route render={(props) => <Notfound />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
