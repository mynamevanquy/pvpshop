import { LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS } from "../actions/authAction";

const initialState = {
  isAuthencation: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthencation: true,
        token: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthencation: false,
        token: null,
      };
      case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthencation: false,
        token: null,
      };
    default:
      return state;
  }
};
export default authReducer;
