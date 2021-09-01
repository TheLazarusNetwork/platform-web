import React, { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import LoadingAnimation from "../emptySpace/LoadingAnimation";
import NoNetwork from "../emptySpace/NoNetwork";

export default function ServiceDetails({ plansArray , error})
 {
   console.log(plansArray)
  const [month, setMonth] = useState(false);

  if(error)
  return (
    <NoNetwork 
      error ={error.message}
    />
  )
  if(plansArray !== null)
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
        <div className='inline'>
          <div className="box-title"> Pricing options</div>
          <icon className="btn">
            <label className='tag label'>{month? "Monthly": "Annual"} </label>
            {month ? (
              <BsToggleOn size={20} onClick={() => setMonth(false)} color="green" />
            ) : (
              <BsToggleOff  size={20} onClick={() => setMonth(true)} color="green" />
            )}
          </icon>
        </div>
        <div className="flex-div">
          {
            [...plansArray].map(plan => {
              // console.log(JSON.parse(plan.plan_cos[0]))
              return(
                <div className="pricing-div">
                <div className="title center">{plan.name}</div>
                <div className="divider" />
                <ul className="">
                  <p>{plan.description}</p>
                </ul>
                <div className="divider" />
                {/* {
                [...JSON.parse(plan.plan_cos)].map((details,index) =>{
                  <React.Fragment key={index}>
                    <li>Cost :{details.cost}</li>
                  </React.Fragment>
                })
                } */}
                <div className="price font-small"><p>{plan.cost} {plan.currency_type}</p></div>
                <button className="font-small center-btn  ">
                  Select Plan
                </button>
              </div>
              )
            })
          }
      
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
          <div className="price"> $50</div>
          <button className="center-btn grey-btn "> Contact Us</button>
        </div>
      </div>
    </>
  );

  else{
    return <LoadingAnimation/>
  }
}
