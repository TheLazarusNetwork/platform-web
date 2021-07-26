import {
  CREATE_ORG_BEGIN,
  CREATE_ORG_FAILURE,
  CREATE_ORG_SUCCESS,
  FETCH_ORG_BEGIN,
  FETCH_ORG_FAILURE,
  FETCH_ORG_SUCCESS,
} from "../CONSTANTS";

const initialState = {
  orgArray: [],
  error: null,
  loading: false,
  numberOfOrgs: 0,
  CurrentOrgID: 1,
};

export default function orgReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORG_BEGIN:
      return {
        ...state,
        loading: true,
        numberOfOrgs: 0,
        error: null,
        CurrentOrgID: 1,
      };
    case FETCH_ORG_SUCCESS:
      return {
        ...state,
        loading: false,
        orgArray: [...action.payload],
        numberOfOrgs: [...action.payload].length,
        CurrentOrgID: 1,
      };
    case FETCH_ORG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        CurrentOrgID: null,
        orgArray: [],
      };

    case CREATE_ORG_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CREATE_ORG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        orgArray: [...state.orgArray, action.payload],
        numberOfOrgs: state.numberOfOrgs + 1,
        CurrentOrgID: action.payload.ID,
      };
    case CREATE_ORG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
