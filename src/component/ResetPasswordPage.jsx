import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResetPassword, useValidateResetToken } from '../hook/customHook';
import {
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Card,
} from 'antd';
import LoadingSpinner from '../util/spin';

const { Title } = Typography;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const { validateToken, loading: validating, error: validationError, isValid } = useValidateResetToken();
  const { resetPassword, loading: resetting, error: resetError, success } = useResetPassword();

  useEffect(() => {
    if (token) {
      validateToken(token).catch(err => {
        console.error('Lỗi khi xác thực token:', err);
      });
    } else {
      navigate('/forgot-password');
    }
  }, [token, validateToken, navigate]);

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, navigate]);

  const handleSubmit = async (values) => {
    const { password, confirmPassword } = values;

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    setPasswordMatchError(false);
    try {
      await resetPassword(token, password, confirmPassword);
    } catch (err) {
      console.error('Lỗi khi đặt lại mật khẩu:', err);
    }
  };

  if (validating) {
    return (
      <LoadingSpinner loading={validating} />
    );
  }

  if (validationError || (!isValid && !validating)) {
    return (
      <div style={{ maxWidth: 400, margin: '50px auto' }}>
        <Alert
          message="Lỗi xác thực"
          description={validationError || 'Token không hợp lệ hoặc đã hết hạn'}
          type="error"
          showIcon
        />
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={() => navigate('/forgot-password')}
        >
          Quay lại trang quên mật khẩu
        </Button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
      <Card bordered>
        <Title level={3} style={{ textAlign: 'center' }}>
          Đặt lại mật khẩu
        </Title>
        <LoadingSpinner
          loading={resetting || success}
          tip={
            resetting
              ? 'Đang xử lý...'
              : 'Bạn đang được chuyển đến trang đăng nhập'
          }
        />
        {success && (
          <Alert
            message="Thành công"
            // description={
            //   <>
            //     {success} <br />
            //     Đang chuyển hướng đến trang đăng nhập...
            //   </>
            // }
            type="success"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        {resetError && (
          <Alert
            message="Lỗi"
            description={resetError}
            type="error"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {passwordMatchError && (
            <Alert
              message="Mật khẩu và xác nhận không khớp!"
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
            // loading={resetting}
            >
              Đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
