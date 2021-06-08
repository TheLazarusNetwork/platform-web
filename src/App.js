import React from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./api/PrivateRoute";
import Auth from "./api/Auth";
import Success from "./Components/Success";
import Failure from "./Components/Failure";
import VerificationPage from './Components/verificationPage'

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
          path="/signin"
          render={(props) => <Login {...props} auth={auth} />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup {...props} auth={auth} />}
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
         render ={(props)=><VerificationPage {...props} auth={auth}/>}
         />
      </div>
    </Router>
  );
};

export default App;
