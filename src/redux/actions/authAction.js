import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const login = (username, password) => async (dispatch) => {
  
  try {
  
    const response = await axios.post("/auth/login", { username, password });
    console.log('response :>> ', response);
    if(response.status ===200){
      console.log('response :>> ', response);
      notification.success({
        message: 'Đăng Nhập thành công',
        description: "Bạn đã đăng nhập tải khoản thành công"
      })
    }
    const token = response.data.accessToken;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    Cookies.set("token", token);
  } catch (error) {
    console.log('error :>> ', error);
    if(error.response.status ===401){
      notification.error({
        message: 'Đăng nhập thất bại',
        description: "Sai tên đăng nhập hoặc mật khẩu"
      })
    }
  }
};

export const logout = () => (dispatch) => {
  Cookies.remove("token");

  dispatch({ type: LOGOUT });
};
