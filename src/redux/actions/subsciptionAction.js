import axios from "axios";
import { config } from "../../api/config";
import { createActivity } from "../../Components/dashBoard/ActivityTable";

import {
  FETCH_SUBS_BEGIN,
  FETCH_SUBS_SUCCESS,
  FETCH_SUBS_FAILURE,
  CREATE_SUBS_BEGIN,
  CREATE_SUBS_SUCCESS,
  CREATE_SUBS_FAILURE,
} from "../CONSTANTS";

export const fetchSubsciption = (currentOrgId) => async (dispatch) => {
  console.log("inside fetch Subsciption");
  const subsUrl = config.platformURL + "/plans/subscription/" + currentOrgId;
  let auth_token = null;
  let isuserloggedin = JSON.parse(localStorage.getItem("supabase.auth.token"));
  if (isuserloggedin) {
    auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
      .currentSession.access_token;
  } else auth_token = null;

  const reqconfig = {
    url: subsUrl,
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth_token}`,
    },
  };
  try {
    dispatch(fetchSubsBegin());
    const response = await axios(reqconfig);
    console.log(response);
    dispatch(fetchSubsSuccess(response.data.payload));
  } catch (e) {
    dispatch(fetchSubsFailure(e));
  }
};

export const createSubsciption =
  (currentOrgId, planId, costId) => async (dispatch) => {
    let auth_token;
    let isuserloggedin = JSON.parse(
      localStorage.getItem("supabase.auth.token")
    );
    if (isuserloggedin) {
      auth_token = JSON.parse(localStorage.getItem("supabase.auth.token"))
        .currentSession.access_token;
    } else auth_token = null;

    const subsUrl = config.platformURL + "/subsciptions";
    var myHeaders = {
      Authorization: `Bearer ${auth_token}`,
      "Content-Type": "application/json",
    };
    var raw = JSON.stringify({
      org_id: currentOrgId.toString(),
      plan_id: Number(planId),
      cost_index: Number(costId),
    });

    var reqconfig = {
      method: "post",
      url: subsUrl,
      headers: myHeaders,
      data: raw,
    };

    try {
      dispatch(createSubsBegin());
      const response = await axios(reqconfig);
      console.log(response.data.payload);
      dispatch(createSubsSuccess(response.data.payload));
      createActivity("New Subsciption activated ");
    } catch (e) {
      dispatch(createSubsFailure(e));
    }
  };

export const fetchSubsBegin = () => ({
  type: FETCH_SUBS_BEGIN,
});

export const fetchSubsSuccess = (Data) => ({
  type: FETCH_SUBS_SUCCESS,
  payload: Data,
});

export const fetchSubsFailure = (error) => ({
  type: FETCH_SUBS_FAILURE,
  payload: { error },
});

export const createSubsBegin = () => ({
  type: CREATE_SUBS_BEGIN,
});

export const createSubsSuccess = (userData) => ({
  type: CREATE_SUBS_SUCCESS,
  payload: userData,
});

export const createSubsFailure = (error) => ({
  type: CREATE_SUBS_FAILURE,
  payload: { error },
});
