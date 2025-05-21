/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Form, Input, InputNumber, Spin, Tabs, notification } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, IdcardOutlined, LoginOutlined, ShopTwoTone } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../redux/actions/authAction';
import LoadingSpinner from '../util/spin';


function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthencation = useSelector((state) => state.isAuthencation);
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    if (isAuthencation) {
      navigate('/');
    }
  },);
  const onFinish = async () => {
    try {
      setLoading(true);
      await dispatch(login(username, password)); // <-- cần await ở đây
    } catch (error) {
      console.log('error :>> ', error);
      notification.error({
        message: 'Lỗi không xác định',
        description: "Vui lòng thử lại sau"
      });
    } finally {
      setLoading(false); // <-- chuyển vào finally để luôn tắt loading
    }
  }

  const onRegister = async (values) => {
    try {
      setLoading(true);
      const result = await dispatch(register(values));
      if (result.success) {
        setUserName(values.taikhoan);
        setPassWord(values.matkhau);
        setActiveTab('login');
      }
    } catch {
      notification.error({
        message: 'Đăng ký thất bại',
        description: 'Có lỗi xảy ra khi đăng ký',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  }
  return (
    <>
      <LoadingSpinner loading={loading} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <Card>
          <Tabs activeKey={activeTab} onChange={setActiveTab} tabPosition="left" style={{ fontWeight: 700 }}>
            <TabPane
              tab={
                <span>
                  <LoginOutlined /> Đăng nhập
                </span>
              }
              key="login"
            >
              <h1>Login PVP_Shop</h1>
              <div>
                <Form
                  className="login-form"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" twoToneColor="#52c41a" />}
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" twoToneColor="#52c41a" />}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassWord(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Nhớ mật khẩu</Checkbox>
                    </Form.Item >
                    <a onClick={handleForgotPassword}
                      className="login-form-forgot" style={{ display: 'block', padding: 1 }}>
                      Quên mật khẩu ?
                    </a>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Đăng nhập
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
            <TabPane
              tab={
                <span>
                  <IdcardOutlined /> Đăng ký
                </span>
              }
              key="register"
            >
              <div>
                <h1>Register PVP_Shop</h1>
                <Form
                  name="normal_login"
                  className="login-form"
                  onFinish={onRegister}
                >
                  <Form.Item
                    name="taikhoan"
                    rules={[{ required: true, message: 'Hãy nhập tên tài khoản của bạn!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên Tài khoản" autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    name="matkhau"
                    rules={[{ required: true, message: 'Hãy nhập mật khẩu của bạn !' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Mật Khẩu"
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Hãy nhập Email của bạn!' },
                      { type: 'email', message: 'Email không đúng định dạng!' },
                    ]}
                  >
                    <Input prefix={<MailOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Email" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="hovaten"
                    rules={[{ required: true, message: 'Hãy nhập họ và tên của bạn!' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ Và Tên" autoComplete="off" />
                  </Form.Item>

                  <Form.Item
                    name="sdt"
                    rules={[
                      { required: true, message: 'Hãy nhập số điện thoại!' },
                      {
                        pattern: /^0\d{9}$/,
                        message: 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0!',
                      },
                    ]}
                  >
                    <Input
                      prefix={<PhoneOutlined className="site-form-item-icon" />}
                      placeholder="Số điện thoại"
                      maxLength={10}
                      autoComplete="off"
                    />
                  </Form.Item>

                  <Form.Item
                    name="diachi"
                  >
                    <Input prefix={<BankOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Địa chỉ" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Đăng Ký
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
}

export default Login