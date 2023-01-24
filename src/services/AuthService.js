import axios from "axios"
import Cookies from 'js-cookie'
import { URL } from '../constants'

const login = (username, password) => {
    return axios
      .post(URL.HOST + "/api/admin/auth/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.token) {
            Cookies.set("token", response.data.token);
            return response.data.token;
        } else {
            throw new Error("Login failed.")
        }
    });
  };

const logout = () => {
    Cookies.removeItem("token");
};
  
export default {
    login,
    logout,
  };