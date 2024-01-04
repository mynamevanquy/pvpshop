import { LOGIN_SUCCESS, LOGOUT } from "../actions/authAction";

const initialState = {
    isAuthencation: false,
    token:null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthencation: true,
                token: action.payload
            };
            case LOGOUT:
                return{
                    ...state,
                    isAuthencation:false,
                    token: null
                };
                default:
                    return state;
    }
}
export default authReducer;