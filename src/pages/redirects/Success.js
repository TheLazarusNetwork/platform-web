import React from "react";
import { useEffect } from "react";

const Success = ({ history, auth }) => {
  useEffect(() => {
    auth.checkAuthenticated().then((val) => {
      auth.setAuthenticated(val);

      history.push("/dash")
    });
  }, []);

  return <div className='center'> Success </div>;
};

export default Success;
