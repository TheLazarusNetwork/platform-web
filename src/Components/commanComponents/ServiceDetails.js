import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import LoadingAnimation from "../emptySpace/LoadingAnimation";
import NoNetwork from "../emptySpace/NoNetwork";

export default function ServiceDetails({ plansArray, error }) {
  console.log(plansArray);
  const [month, setMonth] = useState(false);

  if (error) return <NoNetwork error={error.message} />;
  if (plansArray !== null)
    return (
      <>
        {/* <div className="details-box shadow">
        <div className="box-title">About </div>
        <ul className="service-details">
          <li>sdkjfldsd alsdkfjlask laskdjfsladk lkajsdfd lkasdjflksdj</li>
          <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
          <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
          <li>sdkjfldsd alsdkfjlaskd lkasdjflksdj</li>
        </ul>
      </div> */}

        <div className="pricing mid-details-box shadow">
          <div className="inline">
            <div className="box-title"> Pricing options</div>
            <icon className="btn">
              <label className="tag label">
                {month ? "Monthly" : "Annual"}{" "}
              </label>
              {month ? (
                <BsToggleOn
                  size={20}
                  onClick={() => setMonth(false)}
                  color="green"
                />
              ) : (
                <BsToggleOff
                  size={20}
                  onClick={() => setMonth(true)}
                  color="green"
                />
              )}
            </icon>
          </div>
          <div className="flex-div">
            {[...plansArray].map((plan) => {
              return (
                <div className="pricing-div">
                  <div className="title center">{plan.name}</div>
                  <div className="divider" />
                  <div className="description">
                    <p>{plan.description}</p>
                  </div>
                  <div className="divider" />
                  <ul className="features-list">
                    {Object.keys(plan.features).map((innerAttr, index) => {
                      return (
                        <li key={index}>
                          <span className=""> {innerAttr}</span> :
                          <span className="title">
                            {" "}
                            {plan.features[innerAttr]}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <hr className="divider" />

                  {month ? (
                    <div className="center cost-div">
                      <h1 className="center">
                        {plan.plan_cost[0].cost}
                        <span>{plan.plan_cost[0].currency} </span>
                      </h1>
                      <p className="tag">billed montly</p>
                    </div>
                  ) : (
                    <div className="center cost-div">
                      <h1 className="center">
                        {plan.plan_cost[1].cost}
                        <span>{plan.plan_cost[1].currency}</span>
                      </h1>
                      <p className="tag">billed anually</p>
                    </div>
                  )}
                  <button className="font-small center-btn  ">
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="details-box">
          <div className="pricing-div">
            <div className="title center">Custom</div>
            <div className="divider" />
            <ul className="">
              <li>5 users</li>
              <li>10 hours weekly</li>
            </ul>
            <div className="divider" />
            <div className="cost-div">
              <p>50usd</p>
            </div>
            <button className="center-btn grey-btn "> Contact Us</button>
          </div>
        </div>
      </>
    );
  else {
    return <LoadingAnimation />;
  }
}
