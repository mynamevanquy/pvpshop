import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
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

export const register = (formData) => async (dispatch) => {
  const payload = {
    name: formData.hovaten,
    username: formData.taikhoan,
    email: formData.email,
    passWord: formData.matkhau,
    sdt: formData.sdt || 0,
    diaChi: formData.diachi || "",
    image: formData.image || ""
  };

  try {
    const response = await axios.post('http://localhost:8080/api/auth/register', payload, {
      headers: { 'Content-Type': 'application/json' }
    });

    dispatch({ type: REGISTER_SUCCESS, payload: response.data });

    notification.success({
      message: 'Đăng ký thành công',
      description: 'Hãy đăng nhập để tiếp tục'
    });

    return { success: true, data: response.data };
  } catch (error) {
    dispatch({ type: REGISTER_FAIL });

    notification.error({
      message: 'Đăng ký thất bại',
      description: error?.response?.data || 'Có lỗi xảy ra khi đăng ký'
    });

    return { success: false, error: error?.response?.data || error.message };
  }
};
