import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Button } from "@material-ui/core";
import SnackbarAlert from "./snackbar";
import "./../../styles/components/createSubscription.css";
import { useDispatch, useSelector } from "react-redux";
import { createSubscription } from "../../redux/actions/subscriptionAction";

export default function CreateSubscription({ open, setOpen, planId, month }) {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  const [alertopen, setAlertopen] = useState(false);
  const [alertmsg, setAlertmsg] = useState(" ");
  const [alerttype, setAlertype] = useState("error");

  const { selectedPlan } = useSelector((state) => ({
    selectedPlan: [...state.plans.currentPlans].find(
      (plan) => plan.ID === planId
    ),
  }));

  const { currentOrgId } = useSelector((state) => ({
    currentOrgId: state.organisations.CurrentOrgID,
  }));

  const { wallet } = useSelector((state) => ({
    wallet: state.wallet.walletData,
  }));

  const handleClickOpen = () => {
    //open function to open org form modal
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const activateService = () => {
    if (currentOrgId !== null || currentOrgId !== undefined) 
    {
      const costId = month ? 0 : 1;
      const cost = selectedPlan.plan_cost[costId];
      console.log(currentOrgId, planId, cost)
      dispatch(createSubscription(currentOrgId, planId, cost));
    }
    setOpen(!open);
  };

  return (
    <div className="orgform">
      <SnackbarAlert />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Activate this service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="order-details">
              <div className="order-header">
                <h4 className="order-name">{selectedPlan.name}</h4>
                {month ? (
                  <p className="order-cost">
                    {selectedPlan.plan_cost[0].cost}
                    {selectedPlan.plan_cost[0].currency}
                  </p>
                ) : (
                  <p className="order-cost">
                    {selectedPlan.plan_cost[1].cost}
                    {selectedPlan.plan_cost[1].currency}
                  </p>
                )}
              </div>
              <p className="order-des">{selectedPlan.description}</p>
              <div>
                <ul className="features-list">
                  {Object.keys(selectedPlan.features).map(
                    (innerAttr, index) => {
                      return (
                        <li key={index}>
                          {innerAttr} : {selectedPlan.features[innerAttr]}
                        </li>
                      );
                    }
                  )}
                  <li>time : {month ? " 1 month" : " 1 year"}</li>
                </ul>
              </div>
              <div className="">
                <div className="order-tag">
                  <p>Available Wallet Balance :</p>
                  <div className="">
                    {wallet.balance} {wallet.currency}
                  </div>
                </div>
                <div className="order-tag">
                  <p>Total :</p>
                  <div className="">
                    {month
                      ? selectedPlan.plan_cost[0].cost
                      : selectedPlan.plan_cost[1].cost}{" "}
                    {selectedPlan.plan_cost[0].currency}
                  </div>
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button
            disable={disable}
            onClick={activateService}
            color="primary"
            autoFocus
          >
            Activate
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
