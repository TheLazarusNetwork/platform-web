import {
    FETCH_PLANS_BEGIN,
    FETCH_PLANS_FAILURE,
    FETCH_PLANS_SUCCESS,
  } from "../CONSTANTS";
  
  const initialState = {
    currentPlans: null,
    error: null,
    loading: false,
  };
  
  export default function plansReducer(state = initialState, action) {
    
    switch (action.type) {
      case FETCH_PLANS_BEGIN:
        return {
             ...state,
           loading: true, 
           error: null
           };
           break;
      case FETCH_PLANS_SUCCESS:
          return{
              ...state,
              loading: false,
              currentPlans: action.payload
          };
          break;
      case FETCH_PLANS_FAILURE:
          return{
              ...state,
              loading:false,
              error: action.payload.error,
              currentPlans: null,
          };
          break;
  
      default:
        return state;
    }
  }
  
