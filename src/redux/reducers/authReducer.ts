
import { LOGOUT, AuthActionTypes } from '../types';

interface AuthState {
  userToken: string | null;
  
}

const initialState: AuthState = {
  userToken: null, 
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, userToken: null }; 
    // case LOGIN_SUCCESS:
    //   return { ...state, userToken: action.payload }; 
    default:
      return state;
  }
};

export default authReducer;