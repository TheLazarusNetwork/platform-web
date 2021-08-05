import React from 'react'
import { Redirect } from 'react-router';

export default function Home({auth}) {

    if (localStorage.getItem("location") == "recovery") {
        return <Redirect to="/updatepassword" />;
      } else if (localStorage.getItem("location") == "signup") {
        return <Redirect to="/emailverified" />;
      } else if (auth.isSessionActive()) {
        console.log(' rediected to /success')
        return <Redirect to="/success" />;
      } else {
        console.log(' rediected to /auth')
        return <Redirect to="/auth " />;
      }
 
}
