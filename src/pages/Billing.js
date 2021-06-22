
import React from 'react'
import Topnav from '../Components/Topnav';

export default function Billing() {
    return (
        <>
          {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
          <div className="main">
            <Topnav page="Billing" />
            <div></div>
          </div>
        </>
      );
}
