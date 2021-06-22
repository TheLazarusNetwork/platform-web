import React from 'react'
import Topnav from '../../Components/Topnav';

export default function DedicatedNetwork() {
    return (
        <>
          {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
          <div className="main">
            <Topnav page="Dedicated VPN" />
            <div></div>
          </div>
        </>
      );
}
