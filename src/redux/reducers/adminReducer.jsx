import {
  SET_REPORTS,
  SET_HOSTS,
  LOADING_ADMIN_DATA,
  SET_BAN_LIST,
  SET_ADMIN_ERRORS,
} from "../types";

const initialState = {
  reports: [],
  ban_list: [],
  host_list: [],
  loading: false,
  errors: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_ADMIN_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_REPORTS:
      return {
        ...state,
        reports: action.payload,
        loading: false,
      };
    case SET_HOSTS:
      return {
        ...state,
        host_list: action.payload,
        loading: false,
      };
    case SET_BAN_LIST:
      return {
        ...state,
        ban_list: action.payload,
        loading: false,
      };
    case SET_ADMIN_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
