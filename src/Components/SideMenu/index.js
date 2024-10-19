import {
  AppstoreOutlined,
  UserOutlined,
  FolderOutlined,
  TeamOutlined,
  SettingOutlined,
  PieChartOutlined,
  LogoutOutlined,
  PlusOutlined,
  CalendarOutlined,
  HomeOutlined,
  FileOutlined,
  UserSwitchOutlined,
  CheckOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

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
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <HomeOutlined />,
            key: "/home",
            className: "nnn",
          },
          {
            label: "Candidats",
            key: "/inventory",
            icon: <UserOutlined />,
            className: "nnn",
          },
          {
            label: "Archive Saison",
            key: "/ArchiveSaison",
            icon: <FolderOutlined />,
            className: "nnn",
          },
          {
            label: "Choriste Saison",
            key: "/choristeSaison",
            icon: <TeamOutlined />,
            className: "nnn",
          },
          {
            label: "User Status",
            key: "/statusUsers",
            icon: <UserSwitchOutlined />,
            className: "nnn",
          },
          {
            label: "User Activités",
            key: "/activité",
            icon: <CalendarOutlined />,
            className: "nnn",
          },
          {
            label: "Indiquer Disponibilité",
            key: "/indiquerDispo",
            icon: <CheckOutlined />,
            className: "nnn",
          },
          {
            label: "Auditions",
            key: "/AjoutE",
            icon: <FileOutlined />,
            className: "nnn",
          },
          {
            label: "Ajout Répétition",
            key: "/AjoutRep",
            icon: <PlusOutlined />,
            className: "nnn",
          },
          {
            label: "Get Répétition",
            key: "/GetRep",
            icon: <CalendarOutlined />,
            className: "nnn",
          },
          {
            label: "Statistiques",
            key: "/choix",
            icon: <BarChartOutlined />,
            className: "nnn",
          },
          {
            label: "Saison",
            key: "/saison",
            icon: <PieChartOutlined />,
            className: "nnn",
          },
          {
            label: "Lancer audition",
            key: "/lancerAud",
            icon: <AppstoreOutlined />,
            className: "nnn",
          },
          
          
          {
            label: "Consulter Planning audition",
            key: "/consultePlanning",
            icon: <AppstoreOutlined />,
            className: "nnn",
          },
          {
            label: "Planning audition",
            key: "/plannifierAu",
            icon: <AppstoreOutlined />,
            className: "nnn",
          },
          {
            label: "Nominations",
            key: "/Nominations",
            icon: <AppstoreOutlined />,
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
