// src/redux/reducers/authReducer.ts
import { LOGOUT, AuthActionTypes } from '../types';

interface AuthState {
  userToken: string | null;
  // You could add other auth-related state here like user info, loading, error
}

const initialState: AuthState = {
  userToken: null, // Initially no token
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGOUT:
      return { ...state, userToken: null }; // Clear the token on logout
    // case LOGIN_SUCCESS:
    //   return { ...state, userToken: action.payload }; // Set token on login success
    default:
      return state;
  }
};

export default authReducer;