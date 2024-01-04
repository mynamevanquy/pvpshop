/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button, Card, Checkbox, Form, Image, Input, Spin, Tabs, message, notification } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, BankOutlined, IdcardOutlined, LoginOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import {useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';


function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassWord] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isAuthencation = useSelector((state) => state.isAuthencation);
  useEffect(() => {
    if (isAuthencation) {
      navigate('/');
    }
  },);
  const onFinish = async () => {
    try {
      setLoading(true);
      dispatch(login(username, password))
      setLoading(false);
    } catch (error) {
      console.log('error :>> ', error);
      notification.error({
        message: 'Lỗi không xác định',
        description: "Vui lòng thử lại sau"
      })
      setLoading(false);
    }
    setLoading(false);

  }

  return (
    <Spin spinning={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}  >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: "100vh",
        }}
      >
        <Card>
          <Tabs defaultActiveKey="login" tabPosition="left" style={{
            fontWeight: 700
          }}>
            <TabPane tab={
              <span>
                <LoginOutlined /> Đăng nhập
              </span>
            }
              key="login"
            >
              <h1>Login My Project</h1>
              <div>
                <Form
                  className="login-form"
                  initialValues={{
                    remember: true
                  }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="username"
                    rules={[{
                      required: true,
                      message: 'Please input your Username!'
                    }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{
                      required: true,
                      message: 'Please input your Password!'
                    }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" twoToneColor="#52c41a" value={password} />}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassWord(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>Nhớ mật khẩu</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="" style={{
                      display: 'block',
                      padding: 1
                    }}>
                      Quên mật khẩu ?
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Đăng nhập
                    </Button>
                    { /* Hoặc  <a href=""> đăng ký ngay! </a> */}
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
            <TabPane tab={
              <span>
                <IdcardOutlined /> Đăng ký
              </span>
            }
              key="register"
            >
              <div>
                <h1>Resigter My Project</h1>
                <Form
                  name="normal_login"
                  className="login-form"
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="taikhoan"
                    rules={[{
                      required: true,
                      message: 'Hãy nhập tên tài khoản của bạn!'
                    }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Tên Tài khoản" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="matkhau"
                    rules={[{
                      required: true,
                      message: 'Hãy nhập mật khẩu của bạn !'
                    }]}
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
                    rules={[{
                      required: true,
                      message: 'Hãy nhập Email của bạn!'
                    }]}
                  >
                    <Input prefix={<MailOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Email" autoComplete="off" />
                  </Form.Item>
                  <Form.Item
                    name="sdt"
                  // rules={[{ required: true, message: 'Please input your number!' }]}
                  >
                    <Input prefix={<PhoneOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    name="diachi"
                  // rules={[{ required: true, message: 'Hãy nhập địa chỉ của bạn!' }]}
                  >
                    <Input prefix={<BankOutlined className="site-form-item-icon" twoToneColor="#52c41a" />} placeholder="Địa chỉ" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Đăng Ký
                    </Button>
                    { /* Hoặc <a href="">Đăng nhập ngay!</a> */}
                  </Form.Item>
                </Form>
              </div>
            </TabPane>
          </Tabs>
        </Card>

      </div>
    </Spin>
  )
}

export default Login