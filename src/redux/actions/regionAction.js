import { config } from "../../api/config";
import {
    FETCH_REGION_BEGIN,
    FETCH_REGION_SUCCESS,
    FETCH_REGION_FAILURE,
  } from "../CONSTANTS";
  
  export function fetchRegions() {
  
    console.log("inside fetchRegions");
    const RegionsUrl = config.platformURL+ "/Regions";
  
    return (dispatch) => {
      dispatch(fetchRegionsBegin());
      return fetch(RegionsUrl, {
        method: "GET",
      })
        .then(handleErrors)
        .then((res) => res.json())
        .then((json) => {
          dispatch(fetchRegionsSuccess(json.payload));
          return json.payload;
        })
        .catch((error) => {
          dispatch(fetchRegionsFailure(error));
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
  
  export const fetchRegionsBegin = () => ({
    type: FETCH_Regions_BEGIN,
  });
  
  export const fetchRegionsSuccess = (Data) => ({
    type: FETCH_Regions_SUCCESS,
    payload: Data,
  });
  
  export const fetchRegionsFailure = (error) => ({
    type: FETCH_Regions_FAILURE,
    payload: { error },
  });
  