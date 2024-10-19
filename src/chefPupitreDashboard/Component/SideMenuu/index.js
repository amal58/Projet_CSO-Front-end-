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
            label: "PresenceConcert",
            key: "/MarquerPresenceConcert",
            icon: <UserOutlined />,
            className: "nnn",
          },
          {
            label: "PresenceRepetition",
            key: "/MarquerPresenceRep",
            icon: <UserOutlined />,
            className: "nnn",
          },
          
          {
            label: "Absence Répetition",
            key: "/absenceRep",
            icon: <UserOutlined />,
            className: "nnn",
          },
          {
            label: " Presence Repétition",
            key: "/absenceget",
            icon: <UserOutlined />,
            className: "nnn",
          },
          {
            label: " Presence by programme",
            key: "/prog",
            icon: <UserOutlined />,
            className: "nnn",
          },
         
          <Image width={100} height={20}></Image>,
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
