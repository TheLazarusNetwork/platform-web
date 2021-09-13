import {
  FETCH_SUBS_BEGIN,
  FETCH_SUBS_FAILURE,
  FETCH_SUBS_SUCCESS,
} from "../CONSTANTS";

const initialState = {
  allSubscriptions: null,
  error: null,
  loading: false,
};

export default function subsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case FETCH_SUBS_SUCCESS:
      return {
        ...state,
        loading: false,
        allSubscriptions: [...action.payload].filter((subs) => subs.sub == true),
      };
      break;
    case FETCH_SUBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        allSubscriptions: null,
      };
      break;

    default:
      return state;
  }
}
