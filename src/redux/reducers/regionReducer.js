import {
    FETCH_REGION_BEGIN,
    FETCH_REGION_FAILURE,
    FETCH_REGION_SUCCESS,
  } from "../CONSTANTS";
  
  const initialState = {
    currentRegions: null,
    error: null,
    loading: false,
  };
  
  export default function RegionsReducer(state = initialState, action) {
    
    switch (action.type) {
      case FETCH_REGION_BEGIN:
        return {
             ...state,
           loading: true, 
           error: null
           };
           break;
      case FETCH_REGION_SUCCESS:
          return{
              ...state,
              loading: false,
              currentRegions: action.payload
          };
          break;
      case FETCH_REGION_FAILURE:
          return{
              ...state,
              loading:false,
              error: action.payload.error,
              currentRegions: null,
          };
          break;
  
      default:
        return state;
    }
  }
  
