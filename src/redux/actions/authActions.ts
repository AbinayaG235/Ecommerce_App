import { LOGOUT, AuthActionTypes } from '../types';

export const logout = (): AuthActionTypes => {
  return {
    type: LOGOUT,
  };
};