import React, { useState, createContext } from "react";
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

const auth = new Auth();
const ThemeContext = React.createContext();

const App = () => {
  const [darktheme, setDarktheme] = useState(false);

  return (
    <ThemeContext.Provider value={{ darktheme }}>  

      <Router>
        <div className={darktheme ? "dark-theme" : "light-theme"}>

          <div className="body">

            <PrivateRoute path="/dash/" auth={auth} component={Sidebar} />
            <Switch>
              <PrivateRoute exact path="/dash/" auth={auth} component={Dashboard} />
              <PrivateRoute exact path="/dash/profile" auth={auth} component={Profile} />
              <PrivateRoute exact path="/dash/billing" auth={auth} component={Billing} />
              <PrivateRoute exact path="/dash/settings" auth={auth} component={Settings} />
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
              <PrivateRoute exact path="/dash/cloud" auth={auth} component={Cloud} />
              <PrivateRoute exact path="/dash/organisations" auth={auth} component={Organisations} />
              <Route 
                exact
                path="/"
                render={(props) =>{
                  return localStorage.getItem("auth_state")? (<Redirect to="/dash/"/>) : ( <Redirect to="/signup" />) 
                }}
                />
              <Route
                exact
                path="/signup"
                render={(props) => {
                  return localStorage.getItem("auth_state") ? (
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
                render={(props) =><PasswordReset auth={auth}/>}
                />
                 <Route
                exact
                path="/updatepassword"
                render={(props) =><PasswordUpdate auth={auth}/>}
                />
              <Route render={(props) => <Notfound />} />
            </Switch>
          </div>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
