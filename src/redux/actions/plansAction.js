import axios from "axios";
import { config } from "../../api/config";
import {
    FETCH_PLANS_BEGIN,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_FAILURE,
  } from "../CONSTANTS";
  
  export const fetchPlans = () =>async(dispatch)=> {
  
    console.log("inside fetchPlans");
    const plansUrl = config.platformURL+ "/plans";
  
    try{
      dispatch(fetchPlansBegin())
      const response =await axios.get(plansUrl)
      console.log(response)
        dispatch(fetchPlansSuccess(response.data.payload))
    }   
    catch(e){
      dispatch(fetchPlansFailure(e))
    }
  }

  async function handleErrors(response) {
    if (response.status < 200 || response.status > 299) {
      throw await response.json();
    }
    return response;
  }
  
  export const fetchPlansBegin = () => ({
    type: FETCH_PLANS_BEGIN,
  });
  
  export const fetchPlansSuccess = (Data) => ({
    type: FETCH_PLANS_SUCCESS,
    payload: Data,
  });
  
  export const fetchPlansFailure = (error) => ({
    type: FETCH_PLANS_FAILURE,
    payload: { error },
  });
  