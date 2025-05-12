/* eslint-disable jsx-a11y/anchor-is-valid */
import { Avatar, Button, Drawer, Layout, Menu, Modal, Grid } from "antd";
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
import About from "../component/About";
const { useBreakpoint } = Grid;

function Root() {
  const screens = useBreakpoint();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // state cho Modal
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    navigate("/login");
    dispatch(logout());
  };

  const showLogoutModal = () => {
    setIsModalVisible(true); // Mở Modal
  };

  const handleOk = () => {
    setIsModalVisible(false); // Đóng Modal
    handleLogout(); // Gọi logout
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng Modal nếu không đăng xuất
  };

  useEffect(() => {
    if (token) {
      function base64UrlDecodeUnicode(str) {
        str = str.replace(/-/g, "+").replace(/_/g, "/");
        while (str.length % 4) {
          str += "=";
        }
        const decoded = atob(str);
        return decodeURIComponent(
          [...decoded]
            .map((c) => `%${c.charCodeAt(0).toString(16).padStart(2, "0")}`)
            .join("")
        );
      }

      const decodedToken = base64UrlDecodeUnicode(token.split(".")[1]);
      const parsedToken = JSON.parse(decodedToken);
      setUserName(parsedToken.fullname);
    } else {
      setUserName("");
    }
  }, [token]);

  const items = [
    {
      label: <Link to={"/infor"} />,
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
        <span style={{ cursor: "pointer" }} onClick={showLogoutModal}>
          Đăng Xuất
        </span>
      ),
      key: "3",
    },
  ];

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Layout>
      <Header
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    position: "fixed",
    width: "100%",
    top: 0,
    left: 0,
    borderBottom: "5px solid #ddd",
    backgroundColor: "#001529",
  }}
>
  <div style={{ color: "white" }}>Logo</div>

  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {userName ? (
      <Dropdown
        overlay={<Menu items={items} />}
        trigger={["hover"]} // đảm bảo là hover, không phải click
        placement="bottomRight"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "white",
            cursor: "pointer", // Thêm style con trỏ để dễ nhận biết là có thể click
          }}
        >
          <Avatar
            src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
            size={32}
            style={{ marginRight: 8 }}
          />
          <span style={{ whiteSpace: "nowrap" }}>{userName}</span>
        </div>
      </Dropdown>
    ) : (
      <Link to="/login" style={{ color: "white" }}>
        Login/Register
      </Link>
    )}
  </div>
</Header>

      <Layout style={{ maxWidth: "100%", display: "flex", paddingTop: "2.5%" }}>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 600,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </div>
        </Content>

        {screens.md ? (
         <Sider
         collapsible
         width={250}
         collapsedWidth={90}
         theme="dark"
         style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,  // Thêm dòng này để dính sát trên cùng
        }}
       >        
         <div style={{ textAlign: "center" }}>
           <img
             src="/logogpt.png"
             alt="logo"
             style={{
               height: 100
             }}
           />
         </div>
            <Menu
              theme="dark"
              mode="inline"
              style={{
                paddingTop: 50,
              }}
            >
              <Menu.Item
                key="/"
                icon={<HomeFilled style={{ fontSize: 20, color: "green" }} />}
                style={{
                  marginBottom: 10,
                  borderRadius: 8,
                  backgroundColor: "#1f1f1f",
                }}
              >
                <Link to="/" style={{ fontSize: 16, color: "white" }}>
                  Home
                </Link>
              </Menu.Item>

              <Menu.Item
                key="/about"
                icon={
                  <InfoCircleFilled style={{ fontSize: 20, color: "green" }} />
                }
                style={{
                  marginBottom: 10,
                  borderRadius: 8,
                  backgroundColor: "#1f1f1f",
                }}
              >
                <Link to="/about" style={{ fontSize: 16, color: "white" }}>
                  About
                </Link>
              </Menu.Item>

              <Menu.Item
                key="/contact"
                icon={
                  <EnvironmentFilled style={{ fontSize: 20, color: "green" }} />
                }
                style={{
                  marginBottom: 10,
                  borderRadius: 8,
                  backgroundColor: "#1f1f1f",
                }}
              >
                <Link to="/contact" style={{ fontSize: 16, color: "white" }}>
                  Contact
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={onClose}
            open={visible}
            theme="dark"
          >
            <Menu mode="inline">
              <Menu.Item
                key="/"
                icon={
                  <HomeFilled style={{ fontSize: "20px", color: "blue" }} />
                }
              >
                <Link to="/" onClick={onClose}>
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
                  <>
                    <Link
                      to={"/infor"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "white",
                      }}
                    >
                      <Avatar
                        src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3"
                        size={32}
                        style={{ marginRight: 8 }}
                      />
                      <span style={{ whiteSpace: "nowrap" }}>{userName}</span>
                    </Link>

                    <Dropdown
                      overlay={
                        <Menu>
                          <Menu.Item key="profile">
                            <Link to="/infor">Thông tin cá nhân</Link>
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item key="logout">
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={showLogoutModal}
                            >
                              Đăng xuất
                            </span>
                          </Menu.Item>
                        </Menu>
                      }
                      trigger={["click"]}
                      placement="bottomRight"
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space style={{ color: "white" }}>
                          <DownOutlined />
                        </Space>
                      </a>
                    </Dropdown>
                  </>
                ) : (
                  <Link to="/login" style={{ color: "white" }}>
                    Login/Register
                  </Link>
                )}
              </Menu.Item>
            </Menu>
          </Drawer>
        )}
      </Layout>

      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Có"
        cancelText="Không"
      >
        <p>Bạn có chắc chắn muốn đăng xuất?</p>
      </Modal>

      <Footer style={{ textAlign: "center" }}>Ant Design ©2023</Footer>
    </Layout>
  );
}

export default Root;
