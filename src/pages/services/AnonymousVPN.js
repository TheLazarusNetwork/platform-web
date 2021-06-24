import React from "react";
import Topnav from "../../Components/Topnav";
import "./../../styles/Dashboard/billing.css";

export default function AnonymousVPN() {
  return (
    <>
      {/* <SnackbarAlert
            message={alertmsg}
            alertopen={alertopen}
            setAlertopen={setAlertopen}
            type={alerttype} // type = error, success, info ,warning
          /> */}
      <div className="main">
        <Topnav page="Anonymous VPN" />
        <div className="details-box shadow">
          <div className="box-title">About </div>
          <ul className="service-details">
            <li>sdkjfldsd alsdkfjlask laskdjfsladk lkajsdfd lkasdjflksdj</li>
            <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
            <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
            <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
          </ul>
        </div>

        <div className="pricing details-box shadow">
          <div className="box-title"> Pricing options</div>
          <div className="flex-div">
            <div className="pricing-div">
              <div className="title center">Basic</div>
              <div className="divider" />
              <ul className="">
                <li>5 users</li>
                <li>10 hours weekly</li>
              </ul>
              <div className="divider" />
              <div className="price"> $10</div>
            </div>
            <div className="pricing-div">
              <div className="title center">Basic</div>
              <div className="divider" />
              <ul className="">
                <li>5 users</li>
                <li>10 hours weekly</li>
              </ul>
              <div className="divider" />
              <div className="price"> $10</div>
            </div>           <div className="pricing-div">
              <div className="title center">Basic</div>
              <div className="divider" />
              <ul className="">
                <li>5 users</li>
                <li>10 hours weekly</li>
              </ul>
              <div className="divider" />
              <div className="price"> $10</div>
            </div>
          </div>
          <div>
          <button className='save-btn'> Activate Service</button>
          </div>
        </div>
      </div>
    </>
  );
}
