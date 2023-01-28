import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types"
import AuthService from "../../services/AuthService"

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
      (data) => {
        console.log(data)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: data },
        });
  
        return Promise.resolve();
      },
      (error) => {
        console.log(error)
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        // dispatch({
        //   type: SET_MESSAGE,
        //   payload: message,
        // });
  
        return Promise.reject();
      }
    );
  };

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: LOGOUT,
    });
};