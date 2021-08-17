import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import Topnav from '../Components/navbar/Topnav';
import { getWallet } from '../redux/actions/walletAction';
import ErrorAlert from '../Components/commanComponents/errorAlert';

export default function Wallet() {

  const {walletData , error} = useSelector(state =>({
    walletData : state.wallet.walletData,
    error : state.wallet.error,
  }))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet())
  }, [])
  if(error !== null)
  console.log(error.message)
    return (
        <>
         {error &&  <ErrorAlert
            message={error.message}
            alertopen={"true"}
          />}
          <div className="main">
            <Topnav page="Wallet" />
            <div>

              { walletData && <div className='details-box shadow'>
                <div>
                  <h3>Wallet Balance : {walletData.balance}<span> {walletData.currency}</span></h3>                 
                </div>
              </div>}
              <div className= "details-box shadow">
                  <div className='title'>Redeem a Vouchar</div>
                  <input placeholder='enter voucher code'></input>
                  <button className='save-btn'>redeem now</button>
              </div>
            </div>
          </div>
        </>
      );
}
