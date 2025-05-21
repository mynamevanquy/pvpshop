// src/components/NavigationMenu.jsx
import { Menu } from "antd";

const NavigationMenu = ({
  items,
  onClick,
  selectedKeys,
  mode = "inline",
  theme = "dark",
}) => {
  return (
    <Menu
      theme={theme}
      mode={mode}
      selectedKeys={selectedKeys}
      items={items}
      onClick={onClick}
      style={{ marginTop: 30 }} 
    />
  );
};

export default NavigationMenu;
