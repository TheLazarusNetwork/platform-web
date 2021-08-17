import {
    FETCH_WALLET_BEGIN,
    FETCH_WALLET_FAILURE,
    FETCH_WALLET_SUCCESS,
  } from "../CONSTANTS";
  
  const initialState = {
    walletData: null,
    error: null,
    loading: false,
  };
  
  export default function walletReducer(state = initialState, action) {
    
    switch (action.type) {
      case FETCH_WALLET_BEGIN:
        return {
             ...state,
           loading: true, 
           error: null
           };
           break;
      case FETCH_WALLET_SUCCESS:
          return{
              ...state,
              loading: false,
              walletData: action.payload
          };
          break;
      case FETCH_WALLET_FAILURE:
          return{
              ...state,
              loading:false,
              error: action.payload.error,
              walletData: null,
          };
          break;
  
      default:
        return state;
    }
  }
  