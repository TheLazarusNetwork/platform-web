import React from "react";
import { useEffect } from "react";

const Failure = ({ auth, history, location }) => {
  console.log("IN FAILURE");


  useEffect(() => {
    auth.checkAuthenticated().then((val) => {
      auth.setAuthenticated(val);
      history.push("/signup");
    });
  }, []);

  return <div className='center'> Error {location.search} </div>;
};

export default Failure;
