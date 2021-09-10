import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import LoadingAnimation from "../emptySpace/LoadingAnimation";
import NoNetwork from "../emptySpace/NoNetwork";
import CreateSubscription from "./CreateSubscription";

export default function ServiceDetails({ plansArray, error }) {
  const [month, setMonth] = useState(true);
  const [opendialog, setOpendialog] = useState(false);
  const [planId, setPlanId] = useState(null);

  const selectPlan = (id) => {
    setPlanId(id);
    console.log("hello");
    setOpendialog(true);
  };

  if (error) return <NoNetwork error={error.message} />;
  if (plansArray !== null)
    return (
      <>
        <div className="pricing mid-details-box shadow">
          <div className="inline">
            <div className="box-title"> Pricing options</div>
            <icon className="btn">
              <label className="tag label">
                {month ? "Monthly" : "Annual"}
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
                  <button
                    onClick={() => {
                      selectPlan(plan.ID);
                    }}
                    className="font-small center-btn  "
                  >
                    Select Plan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {opendialog && (
          <CreateSubscription
            open={opendialog}
            setOpen={setOpendialog}
            planId={planId}
            month={month}
          />
        )}
      </>
    );
  else {
    return <LoadingAnimation />;
  }
}
