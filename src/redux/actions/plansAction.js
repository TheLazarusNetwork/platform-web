import {
    FETCH_PLANS_BEGIN,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_FAILURE,
  } from "../CONSTANTS";
  
  export function fetchPlans() {
  
    console.log("inside fetchPlans");
    const plansUrl = "https://platform.lazarus.network/api/v1.0/plans";
  
    return (dispatch) => {
      dispatch(fetchPlansBegin());
      return fetch(plansUrl, {
        method: "GET",
      })
        .then(handleErrors)
        .then((res) => res.json())
        .then((json) => {
          dispatch(fetchPlansSuccess(json.payload));
          return json.payload;
        })
        .catch((error) => {
          dispatch(fetchPlansFailure(error));
          console.log(error);
        });
    };
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
  