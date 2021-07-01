import React from 'react'

export default function ServiceDetails() {
    return (
      <>
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
            </div>{" "}
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
          </div>
          <div>
            <button className="save-btn"> Activate Service</button>
          </div>
        </div>
      </>
    );
  };
  