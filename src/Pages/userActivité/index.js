import React, { useEffect, useState } from "react";
import axios from 'axios';
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import { Card, Col, Row, Typography, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./UserStatus.css"; // Ajoutez ce fichier pour le style

const { Text } = Typography;

function UserActivité() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get("http://localhost:3000/api/utilisateur/choristeWithActivity");
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  }

  function filterUsers(key) {
    const filtered = users.filter(user => 
      user.nom.toLowerCase().includes(key.toLowerCase()) ||
      user.prenom.toLowerCase().includes(key.toLowerCase()) ||
      user.email.toLowerCase().includes(key.toLowerCase())
    );
    setFilteredUsers(filtered);
  }

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div className="PageContent">
          <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-auto mt-12">
              <h1 className="text-3xl my-2 text-center">
                <b>Historique de status des choristes</b>
              </h1>
              <div className="search-bar-container">
                <Input
                  placeholder="Rechercher"
                  onChange={(e) => filterUsers(e.target.value)}
                  suffix={<SearchOutlined />}
                  className="search-bar"
                />
              </div>
              <div className="user-cards">
                <Row gutter={[20, 20]}>
                  {filteredUsers.map((user) => (
                    <Col key={user._id} xs={24} sm={12} md={8} lg={6}>
                      <Card
                      style={{alignItems:'center' , alignContent:'center' , justifyItems:'center'}}
                        title={`         ${user.nom} ${user.prenom}`}
                        bordered={false}
                        className="user-card"
                        
                      >
                     {
                          <Link to={`/user/${user._id}`}>
                            <Button type="primary" className="btn">Voir</Button>
                          </Link>
                        }
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserActivité;
