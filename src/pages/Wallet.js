import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Topnav from "../Components/navbar/Topnav";
import { getWallet } from "../redux/actions/walletAction";
import ErrorAlert from "../Components/commanComponents/errorAlert";
import SnackbarAlert from "../Components/commanComponents/snackbar";
import { config } from "../api/config";
import axios from "axios";

export default function Wallet() {
  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");

  const { walletData, error } = useSelector((state) => ({
    walletData: state.wallet.walletData,
    error: state.wallet.error,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWallet());
  }, []);

  const redeemVoucher = (e) => {
    e.preventDefault();
    const voucherCode = e.target.code.value;
    const voucherPin = e.target.pin.value;

    if (voucherCode.length !== 16) {
      setAlertmsg("voucher code invalid");
      setAlertype("error");
      setAlertopen(true);
    } else if (voucherPin.length !== 4) {
      setAlertmsg("voucher pin invalid");
      setAlertype("error");
      setAlertopen(true);
    } else {
      claimVoucher(voucherCode, voucherPin);
    }
  };
  const claimVoucher = async(voucherCode, voucherPin) => {
    const voucherUrl = config.platformURL + "/vouchers";

    let auth_token = null;
    let isuserloggedin = JSON.parse(
      localStorage.getItem("supabase.auth.token")
    );
    if (isuserloggedin) {
      auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
        .currentSession.access_token;
    } else auth_token = null;

    var data = JSON.stringify({
      code: voucherCode,
      pin: Number(voucherPin),
    });

    var reqconfig = {
      method: "post",
      url: voucherUrl,
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    try {
      const res = await axios(reqconfig);
      console.log(res.data)
      if (error) throw error;
      setAlertmsg('voucher claimed Success,Your balance will be updated soon')
      setAlertype('success')
      setAlertopen(true)

    } catch (e) {
      console.log(e);
      setAlertmsg('voucher claim failed')
      setAlertype('error')
      setAlertopen(true)
    }
  };

  if (error !== null) console.log(error.message);
  return (
    <>
      {error && <ErrorAlert message={error.message} alertopen={"true"} />}
      <SnackbarAlert
        message={alertmsg}
        alertopen={alertopen}
        setAlertopen={setAlertopen}
        type={alerttype} // type = error, success, info ,warning
      />
      <div className="main">
        <Topnav page="Wallet" />
        <div>
          {walletData && (
            <div className="details-box shadow">
              <div>
                <h3>
                  Wallet Balance : {walletData.balance}
                  <span> {walletData.currency}</span>
                </h3>
              </div>
            </div>
          )}
          <div className="details-box shadow">
            <div className="title">Redeem a Vouchar</div>
            <form
              onSubmit={(e) => {
                redeemVoucher(e);
              }}
            >
              <input name="code" id="code" placeholder="voucher code"></input>
              <input
                type="number"
                name="pin"
                id="pin"
                placeholder="voucher pin"
              ></input>
              <button type="submit" className="save-btn">
                redeem now
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
