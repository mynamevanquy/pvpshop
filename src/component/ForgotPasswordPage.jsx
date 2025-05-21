import React from 'react';
import { useForgotPassword } from '../hook/customHook';
import {
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Card,
} from 'antd';
import LoadingSpinner from '../util/spin';

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const { forgotPassword, loading, error, success } = useForgotPassword();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await forgotPassword(values.email);
    } catch (err) {
      console.error('Lỗi:', err);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '50px auto' }}>
      <Card bordered>
        <Title level={3} style={{ textAlign: 'center' }}>
          Quên mật khẩu
        </Title>
        <LoadingSpinner loading={loading} />
        {success && (
          <Alert
            message="Thành công"
            description={success}
            type="success"
            showIcon
            style={{ marginBottom: 20 }}
          />
        )}

        {error && (
          <Alert
            message="Lỗi"
            description={error}
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
            label="Địa chỉ email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>

          <Text type="secondary">
            Nhập email đã đăng ký với tài khoản của bạn để nhận liên kết đặt lại mật khẩu.
          </Text>

          <Form.Item style={{ marginTop: 20 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              // loading={loading}
            >
              Gửi yêu cầu đặt lại mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
