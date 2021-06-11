import React, { Component, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import "./../styles/Dashboard/dashboard.css";
import Profile from "./Profile";
import Settings from "./Settings";
import AnonymousVPN from "./services/AnonymousVPN";
import DedicatedVPN from "./services/DedicatedVPN";
import Tunnel from "./services/Tunnel";
import Billing from "./Billing";
import Home from "./Home";

const location =
  window.location.protocol + "//" + window.location.host + "/verify";

export default function Dashboard(props) {
  const [auth, setAuth] = useState(props.auth);

  const getdetails = async () => {
    let details;
    try {
      const data = await auth.checkAuthenticated();
      details = data;
    } catch (e) {
      console.log(e);
    }
    console.log(details);
  };

  const verifyemail = async () => {
    //sending user verification email
    let verified;
    try {
      verified = await auth.sendVerificationEmail(location);
    } catch (e) {
      console.log(e);
    }
    console.log(verified);
  };

  const createJWT = async () => {
    let jwt;
    try {
      jwt = await auth.createJWT();
    } catch (e) {
      console.log(e);
    }
    console.log(jwt);
  };

  return (
    <div className="body">
      <div className="router">
        {/* <Router> */}
        <Route path="/" render={(props) => <Sidebar auth={auth} />} />
          <Switch>
            
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} auth={auth} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} auth={auth} />}
            />
            <Route
              exact
              path="/billing"
              render={(props) => <Billing {...props} auth={auth} />}
            />
            <Route
              exact
              path="/settings"
              render={(props) => <Settings {...props} auth={auth} />}
            />
            <Route
              exact
              path="/anonvpn"
              render={(props) => <AnonymousVPN {...props} auth={auth} />}
            />
            <Route
              exact
              path="/dedivpn"
              render={(props) => <DedicatedVPN {...props} auth={auth} />}
            />
            <Route
              exact
              path="/tunnel"
              render={(props) => <Tunnel {...props} auth={auth} />}
            />
          </Switch>
        {/* </Router> */}
      </div>
    </div>
  );
}
