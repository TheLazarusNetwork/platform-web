import React from "react";
import { useEffect } from "react";
import { createActivity } from "../../Components/dashBoard/ActivityTable";

const getIp = async () => {
  const request = await fetch(
    `https://ipinfo.io/json?token=${process.env.REACT_APP_IP_TOKEN}`
  );
  const jsonResponse = await request.json();
  localStorage.setItem('ipinfo' ,JSON.stringify( jsonResponse));
  console.log('success page ' ,localStorage.getItem('ipinfo'))
  createActivity('Logged In')
};

const Success = ({ history }) => {
    useEffect(() => {
      getIp()
      
      history.push("/dash")
  }, []);
  return <div className='center'> Success </div>;
};
export default Success;

