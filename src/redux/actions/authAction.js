import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const login = (username, password) => async (dispatch) => {
  
  try {
  
    const response = await axios.post("/auth/login", { username, password });
    if(response.status ===200){
      notification.success({
        message: 'Đăng Nhập thành công',
        description: "Bạn đã đăng nhập tải khoản thành công"
      })
    }
    const token = response.data.accessToken;
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    Cookies.set("token", token);
  } catch (error) {
    if(error?.response?.status ===401){
      notification.error({
        message: 'Đăng nhập thất bại',
        description: "Sai tên đăng nhập hoặc mật khẩu"
      })
    }else{
      notification.error({
        message: 'Đăng nhập thất bại',
        description: "Máy chủ không phản hồi vui lòng thử lại sau"
      })
    }
  }
};

export const logout = (navigate) => (dispatch) => {
  Cookies.remove("token");
  dispatch({ type: LOGOUT });

  notification.info({
    message: "Đã đăng xuất",
    description: "Bạn đã đăng xuất khỏi hệ thống",
  });

  if (navigate) {
    navigate("/login");
  }
};