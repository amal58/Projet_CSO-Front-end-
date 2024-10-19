import {
  AppstoreOutlined,
  FolderAddOutlined,
  PlusOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../App.css";
function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <div className="SideMenu">
      <Menu
        className="SideMenuVertical"
        mode="vertical"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          <Image width={100} height={20}></Image>,

          {
            label: "Home\n",

            icon: <AppstoreOutlined />,
            key: "/hom",
            className: "nnn",
          },
          {
            label: "Status\n",

            icon: <AppstoreOutlined />,
            key: "/statuut",
            className: "nnn",
          },
          {
            label: "Ajout Absence\n",

            icon: <AppstoreOutlined />,
            key: "/getAbs",
            className: "nnn",
          },
          {
            label: "Ajout Absence 2\n",

            icon: <AppstoreOutlined />,
            key: "/abs2",
            className: "nnn",
          }, {
            label: "Ajout Absence 3\n",

            icon: <AppstoreOutlined />,
            key: "/absenc",
            className: "nnn",
          },
          {
            label: "Get Absence Concert\n",

            icon: <AppstoreOutlined />,
            key: "/getAbss",
            className: "nnn",
          },
          {
            label: "QR code repétition\n",

            icon: <AppstoreOutlined />,
            key: "/RepetitionsQR",
            className: "nnn",
          },
          {
            label: "QR code concert\n",

            icon: <AppstoreOutlined />,
            key: "/QRconcert",
            className: "nnn",
          },
          {
            label: "Get Absence Repétition \n",

            icon: <AppstoreOutlined />,
            key: "/AbsR",
            className: "nnn",
          },
          
          
          {
            label: "Logout",
            key: "/",
            icon: <LogoutOutlined />,
            className: "nnn",
          },
        ]}
      ></Menu>
    </div>
  );
}
export default SideMenu;
