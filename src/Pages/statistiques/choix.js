import React from "react";
import { Card, Col, Row, Button } from "antd";
import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ChoicePage.css";
import AppHeader from "../../Components/AppHeader";
//import SideMenu from "../../Components/SideMenuChoriste";
import SideMenu from "../../Components/SideMenu";
const ChoicePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="App1">
   
       
        <AppHeader/>
        <div className="SideMenuAndPageContent">
        <SideMenu/>
        <div className="choice-page">
      <Row gutter={16}>
        <Col span={8}>
          <Card
            title="Statistiques des Répétitions"
            bordered={false}
            className="choice-card"
            hoverable
            onClick={() => handleNavigate("/statRep")}
            cover={
              <BarChartOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
            }
          >
            <p>Consultez les statistiques des présences et absences des répétitions.</p>
            <Button type="primary" onClick={() => handleNavigate("/statRep")}>
              Voir les Statistiques
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Statistiques des Concerts"
            bordered={false}
            className="choice-card"
            hoverable
            onClick={() => handleNavigate("/stat")}
            cover={
              <LineChartOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
            }
          >
            <p>Consultez les statistiques des présences et absences des concerts.</p>
            <Button type="primary" onClick={() => handleNavigate("/stat")}>
              Voir les Statistiques
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Statistiques des oevre"
            bordered={false}
            className="choice-card"
            hoverable
            onClick={() => handleNavigate("/oeuv")}
            cover={
              <BarChartOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
            }
          >
            <p>Consultez les statistiques concernant les oeuvres.</p>
            <Button type="primary" onClick={() => handleNavigate("/oeuv")}>
              Voir les Statistiques
            </Button>
          </Card>
        </Col>
      </Row>
      
    </div>
    </div>
    </div>
  );
};

export default ChoicePage;
