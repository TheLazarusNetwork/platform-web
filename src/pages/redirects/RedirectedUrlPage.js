import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router";

export default function RedirectedUrlPage({auth}) {
  // const [url, setUrl] = useState();
  const history = useHistory();
  // const location = useLocation();
  // useEffect(() => {
  //   setUrl(location.pathname);
  // }, []);

  // console.log(location, getQueryVariable("type"));

  // function getQueryVariable(variable) {
  //   var query = location.pathname.substring(1);
  //   var vars = query.split("&");
  //   for (var i = 0; i < vars.length; i++) {
  //     var pair = vars[i].split("=");
  //     if (pair[0] == variable) {
  //       return pair[1];
  //     }
  //   }
  //   return false;
  // }
  // const type = getQueryVariable("type");
  // if (type == "recovery")
  //  { history.push('/passwordupdate')
  //   return(
  //     <>
  //     </>
  //   )}
  // else if (type == "email") return <Emailverification />;

  
    if(auth.isSessionActive())
    history.push("/dash");
    else
    history.push("/signup")
    return(
      <>
      </>
    )
  
}

function Emailverification() {
  return (
    <div className="center">
      <h1>Your email has been verified .</h1>
      <h4>You can now login to access your dashboard</h4>
      <div className="center">
        <Link to="/signup">
          <button>to to signin page</button>
        </Link>
      </div>
    </div>
  );
}

