/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Button, Drawer, Layout, Menu, Popconfirm, Grid } from "antd";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Home from "../component/Home";
import Contact from "../component/Contacts";
import React, { useEffect, useState } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  HomeFilled,
  InfoCircleFilled,
  EnvironmentFilled,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import Sider from "antd/es/layout/Sider";
const { useBreakpoint } = Grid;
function Root() {
  const screens = useBreakpoint();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState(null);
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };
  useEffect(() => {
    try {
    } catch (error) {}
    
    if (token) {
      const decodedToken = atob(token.split(".")[1]);
    const parsedToken = JSON.parse(decodedToken);
    console.log('convertToken :>> ', parsedToken);
      setUserName(parsedToken.fullname);
    } else {
      setUserName("");
    }
  }, [token]);
  const items = [
    {
      label: <Link to={"/login"} />,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <Popconfirm
          title="Bạn có chắc chắn muốn đăng xuất?"
          onConfirm={handleLogout} // Hàm xử lý đăng xuất
          okText="Có"
          cancelText="Không"
        >
          Đăng Xuất
        </Popconfirm>
      ),
      key: "3",
    },
  ];

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Header
       style={{
        textAlign: "right",
        fontSize: 15,
        maxWidth: "100%",
        position: "fixed",
        width: "100%",
        borderBottom: "5px solid #ddd", // Viền dưới của Header
        top: 0,
        left: 0,
      }}
      >
        {!screens.md ? (
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{ position: "fixed", left: "30px", top: "15px" }}
          />
        ) : null}
{screens.md && (
  <React.Fragment>
    {userName ? (
      <Link to={"/infor"}>
        {" "}
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />{" "}
        {userName}
      </Link>
    ) : (
      <Link to="/login">Login/Register</Link>
    )}
    {userName && (
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <a>
          <Space style={{ paddingLeft: 10 }}>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    )}
  </React.Fragment>
)}
      </Header>
      <Layout style={{ maxWidth: "100%", display: "flex" }}>
      <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 600,
              // background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" exact component={Home} />
              <Route path="/contact" component={Contact} />
            </Routes>
            </div>
        </Content>
        {screens.md ? (
          <Sider
            collapsible
            width={200} // Độ rộng của Sider khi mở
            collapsedWidth={80} // Độ rộng của Sider khi rút lại
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            <Menu theme="dark" mode="inline">
              <Menu.Item
                key="/"
                icon={
                  <HomeFilled style={{ fontSize: "20px", color: "blue" }} />
                }
              >
                <Link to="/"> Home</Link>
              </Menu.Item>
              <Menu.Item
                key="/about"
                icon={
                  <InfoCircleFilled
                    style={{ fontSize: "20px", color: "blue" }}
                  />
                }
              >
                <Link to="/about">About</Link>
              </Menu.Item>
              <Menu.Item
                key="/contact"
                icon={
                  <EnvironmentFilled
                    style={{ fontSize: "20px", color: "blue" }}
                  />
                }
              >
                <Link to="/contact">Contact</Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          // Nếu màn hình nhỏ hơn medium thì hiển thị Drawer
          <Drawer
            title="Menu"
            placement="left"
            closable={true}
            onClose={onClose}
            open={visible}
            theme="dark" 
          >
           
            <Menu 
            mode="inline"
            >
              <Menu.Item
                key="/"
                icon={
                  <HomeFilled style={{ fontSize: "20px", color: "blue" }} />
                }
              >
                <Link to="/" onClick={onClose}>
                  {" "}
                  Home
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/about"
                icon={
                  <InfoCircleFilled
                    style={{ fontSize: "20px", color: "blue" }}
                  />
                }
              >
                <Link to="/about" onClick={onClose}>
                  About
                </Link>
              </Menu.Item>
              <Menu.Item
                key="/contact"
                icon={
                  <EnvironmentFilled
                    style={{ fontSize: "20px", color: "blue" }}
                  />
                }
              >
                <Link to="/contact" onClick={onClose}>
                  Contact
                </Link>
              </Menu.Item>
              <Menu.Item>
              {userName ? (
            <Link to={"/infor"}>
              {" "}
              <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />{" "}
              {userName}
            </Link>
          ) : (
            <Link to="/login">Login/Register</Link>
          )}

          {userName ? (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a>
                <Space style={{ paddingLeft: 10 }}>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          ) : (
            ""
          )}
           </Menu.Item>
            </Menu>
          </Drawer>
        )}
       
        <Outlet />
      </Layout>
      <Footer style={{ textAlign: "center" }}>Ant Design ©2023</Footer>
    </Layout>
  );
}
export default Root;
