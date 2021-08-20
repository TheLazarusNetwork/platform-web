import React from "react";
import { useEffect } from "react";
import { createActivity } from "../../Components/dashBoard/ActivityTable";

const Success = ({ history }) => {
  useEffect(() => {
      createActivity('Sign-in', 'Success')
      history.push("/dash")
  }, []);
  return <div className='center'> Success </div>;
};
export default Success;
