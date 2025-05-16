import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout, Menu, Modal, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import Cookies from "js-cookie";

const { Header, Content, Footer, Sider } = Layout;

const Root = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();
  const token = Cookies.get("token");
  useEffect(() => {
    if (token && location.pathname === "/login") {
      navigate("/");
    } else if (!token && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [token, location.pathname, navigate]);
  
  const items = [
    {
      key: "/",
      icon: <PieChartOutlined />,
      label: "Trang Chủ",
    },
    {
      key: "/about",
      icon: <DesktopOutlined />,
      label: "Giới Thiệu",
    },
    {
      key: "/contact",
      icon: <UserOutlined />,
      label: "Liên Hệ",
    },
    {
      key: "/infor",
      icon: <TeamOutlined />,
      label: "Trang Cá Nhân",
    },
  ];

  function decodeJwtPayload(token) {
    if (!token || typeof token !== "string") {
      console.warn("Token không hợp lệ hoặc không tồn tại!");
      return null;
    }

    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) throw new Error("Token sai định dạng");

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (err) {
      console.error("Giải mã token thất bại:", err.message);
      return null;
    }
  }

  // Token gốc

  const payload = decodeJwtPayload(token);
  const userName = payload?.fullname;

  const handleOk = () => {
    if (token) {
      Cookies.remove("token");
      navigate("/login");
    }
    setIsModalVisible(false);
  };
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleMenuClick = ({ key }) => {
    if (key === "/login") {
      setIsModalVisible(true); // Gọi modal xác nhận
    } else {
      navigate(key);
    }
  };
  const itemsdrop = [
    {
      key: "/infor",
      label: "Trang Cá Nhân",
      icon: <UserOutlined />,
    },
    {
      key: "/login",
      label: "Đăng Xuất",
      icon: <FileOutlined />,
    },
  ];

  return (
    <Layout style={{ overflowX: "hidden" }}>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          left: 0,
          borderBottom: "5px solid #ddd",
          backgroundColor: "#001529",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img
            src="logopvpshop.png"
            style={{
              width: "70px",
              height: "auto",
              maxWidth: "100%",
              marginRight: "5px",
            }}
            alt="Logo"
          />
          <span>PVP-Shop</span>
        </div>
        <div
          onClick={() => setDrawerVisible(true)}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "white", // màu chữ cho theme tối
          }}
        >
          {userName ? (
            <Dropdown
              menu={{ items: itemsdrop, onClick: handleMenuClick }}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#1890ff" }}
                />
                <span style={{ color: "white" }}>{userName}</span>
              </div>
            </Dropdown>
          ) : (
            <Button onClick={handleOk}>Đăng Nhập / Đăng Ký</Button>
          )}
        </div>
      </Header>

      <Layout hasSider style={{ paddingTop: 64 }}>
        {screens.md && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => {
              setCollapsed(value);
              document.getElementById("main-content").style.marginLeft = value
                ? "90px"
                : "250px";
            }}
            width={250}
            collapsedWidth={90}
            theme="dark"
            style={{
              overflow: "auto",
              height: "calc(100vh - 64px)",
              position: "fixed",
              left: 0,
              top: 64,
            }}
          >
            <Menu
              theme="dark"
              selectedKeys={[location.pathname]}
              mode="inline"
              onClick={({ key }) => navigate(key)}
              items={items}
            />
          </Sider>
        )}

        <Layout
          style={{
            marginLeft: screens.md ? 250 : 0,
            transition: "all 0.2s",
          }}
          id="main-content"
        >
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                minHeight: 600,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Ant Design ©2023</Footer>
        </Layout>
      </Layout>

      {!screens.md && (
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          bodyStyle={{
            padding: 0,
            backgroundColor: "#1f1f1f",
            color: "#fff",
          }}
          headerStyle={{
            backgroundColor: "#141414",
            borderBottom: "1px solid #333",
            color: "#fff",
          }}
          closeIcon={<span style={{ color: "#fff", fontSize: 18 }}>✕</span>}
        >
          <Menu
            theme="dark"
            mode="vertical"
            items={itemsdrop}
            onClick={handleMenuClick}
          />
        </Drawer>
      )}

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
    </Layout>
  );
};

export default Root;
