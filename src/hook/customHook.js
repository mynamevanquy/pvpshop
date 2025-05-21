// Đầu tiên, tạo các custom hooks cho việc quên mật khẩu

import { useState,useCallback  } from 'react';
import axios from 'axios';

// Base URL của API - thay đổi theo môi trường của bạn
// const API_BASE_URL = 'http://localhost:8080/api/password';

// Hook xử lý quên mật khẩu (gửi email)
export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await axios.post("/password/forgot", { email });
      
      setSuccess(response.data.message);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error, success };
};

// Hook xử lý kiểm tra token có hợp lệ không
export const useValidateResetToken = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const validateToken = useCallback(async (token) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`/password/validateToken?token=${token}`);
      
      setIsValid(true);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Token không hợp lệ hoặc đã hết hạn');
      setIsValid(false);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []); // <- không có dependencies để giữ ổn định

  return { validateToken, loading, error, isValid };
};
// Hook xử lý đặt lại mật khẩu
export const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const resetPassword = async (token, password, confirmPassword) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await axios.post("password/reset", {
        token,
        password,
        confirmPassword
      });
      
      setSuccess(response.data.message);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi khi đặt lại mật khẩu');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, success };
};