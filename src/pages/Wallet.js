import React, { useEffect } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import Topnav from '../Components/navbar/Topnav';
import { getWallet } from '../redux/actions/walletAction';

export default function Wallet() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet())
  }, [])
    return (
        <>
          {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
          <div className="main">
            <Topnav page="Wallet" />
            <div></div>
          </div>
        </>
      );
}
