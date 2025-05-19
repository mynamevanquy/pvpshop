import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Drawer, Layout, Modal, Dropdown } from "antd";
import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";
import LoadingSpinner from "../util/spin";
import NavigationMenu from "../component/NavigationsMenu";

const { Header, Content, Footer, Sider } = Layout;

const Root = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const screens = useBreakpoint();
  const location = useLocation();
  const contentRef = useRef(null);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const decodeJwtPayload = (token) => {
    if (!token || typeof token !== "string") return null;
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) throw new Error("Token không hợp lệ");

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
  };

  const payload = decodeJwtPayload(token);
  const userName = payload?.fullname;

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogoutConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch(logout(navigate));
      setIsModalVisible(false);
      setLoading(false);
    }, 500);
  };

  const handleCancel = () => setIsModalVisible(false);

  const handleMenuClick = ({ key }) => {
    if (key === "/login") {
      setIsModalVisible(true);
    } else {
      navigate(key);
      setDrawerVisible(false);
    }
  };

  const siderMenuItems = [
    { key: "/", icon: <PieChartOutlined />, label: "Trang Chủ" },
    { key: "/about", icon: <DesktopOutlined />, label: "Giới Thiệu" },
    { key: "/contact", icon: <UserOutlined />, label: "Liên Hệ" },
    { key: "/infor", icon: <TeamOutlined />, label: "Trang Cá Nhân" },
  ];

  const dropdownItems = [
    { key: "/infor", label: "Trang Cá Nhân", icon: <UserOutlined /> },
    { key: "/login", label: "Đăng Xuất", icon: <FileOutlined /> },
  ];

  return (
    <Layout style={{ overflowX: "hidden" }}>
      {/* HEADER */}
      <Header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
          backgroundColor: "#001529",
          borderBottom: "5px solid #ddd",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            maxWidth: 400, // Giới hạn chiều rộng tối đa (điều chỉnh nếu cần)
            minWidth: 0, // Để flexbox tính toán co lại đúng
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <img
            src="logopvpshop.png"
            alt="Logo"
            style={{ width: 50, height: "auto", marginRight: 5, flexShrink: 0 }}
          />
          <span style={{ textOverflow: "ellipsis", overflow: "hidden" }}>
            PVP-Shop
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {userName ? (
            <Dropdown
              menu={{ items: dropdownItems, onClick: handleMenuClick }}
              placement="bottomRight"
              trigger={["click"]}
              arrow={{ pointAtCenter: true }}
            >
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  style={{ backgroundColor: "#1890ff" }}
                />
                <span
                  style={{
                    color: "white",
                    maxWidth: 100,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {userName}
                </span>
              </div>
            </Dropdown>
          ) : (
            <Button onClick={() => navigate("/login")}>
              Đăng Nhập / Đăng Ký
            </Button>
          )}

          {/* Icon menu hiển thị sau tên người dùng hoặc nút đăng nhập */}
          {!screens.md && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerVisible(true)}
              style={{ color: "white", fontSize: 20 }}
            />
          )}
        </div>
      </Header>

      {/* BODY */}
      <Layout hasSider style={{ paddingTop: 64 }}>
        {/* SIDEBAR */}
        {screens.md && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={250}
            collapsedWidth={90}
            theme="dark"
            style={{
              position: "fixed",
              top: 64,
              left: 0,
              height: "calc(100vh - 64px)",
              overflow: "auto",
            }}
          >
            <NavigationMenu
              items={siderMenuItems}
              onClick={({ key }) => navigate(key)}
              selectedKeys={[location.pathname]}
            />
          </Sider>
        )}

        {/* CONTENT */}
        <Layout
          id="main-content"
          style={{
            marginLeft: screens.md ? (collapsed ? 90 : 250) : 0,
            transition: "all 0.2s",
          }}
        >
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              ref={contentRef}
              style={{
                padding: 24,
                minHeight: 600,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <LoadingSpinner loading={loading} />
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>Ant Design ©2023</Footer>
        </Layout>
      </Layout>

      {/* DRAWER FOR MOBILE */}
      {!screens.md && (
        <Drawer
          title="Menu"
          placement="right"
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          bodyStyle={{ padding: 0, backgroundColor: "#1f1f1f" }}
          headerStyle={{ backgroundColor: "#141414", color: "#fff" }}
          closeIcon={<span style={{ color: "#fff", fontSize: 18 }}>✕</span>}
        >
          <NavigationMenu
            items={siderMenuItems}
            onClick={handleMenuClick}
            selectedKeys={[location.pathname]}
            mode="vertical"
          />
        </Drawer>
      )}

      {/* LOGOUT MODAL */}
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleLogoutConfirm}
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
