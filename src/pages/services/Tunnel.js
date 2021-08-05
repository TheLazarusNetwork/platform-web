import React from 'react'
import Topnav from '../../Components/navbar/Topnav';

export default function Tunnel() {
    return (
        <>
          {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
          <div className="main">
            <Topnav page="Tunnel" />
            <div></div>
          </div>
        </>
      );
}
