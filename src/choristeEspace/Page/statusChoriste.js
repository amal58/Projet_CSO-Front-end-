import React, { useEffect, useState } from "react";
import axios from 'axios';
import SideMenu from "../Component/SideMenuu";
import AppHeader from "../Component/AppHeadere";
import { Card, CardContent, Typography } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

function ChoristeStatus() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    try {
      const response = await axios.get(`http://localhost:3000/api/utilisateur/UserWithActivity/${JSON.parse(localStorage.getItem('user'))._id}`);
      setUsers(response.data);
    
      console.log("users"+users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  }

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div>
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
              <h1 className="text-3xl my-2">
                <br />
                &nbsp;&nbsp; <b>Historique de status des choristes</b>
              </h1>
              <br />

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl border border-gray-100 p-2 item-center">
                        &nbsp;&nbsp;{" "}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {users && (
                    <Card key={users._id} className="user-card" style={{ width: "450px", margin: "30px 0 5px 30px", alignItems: 'center' }}>
                      <CardContent>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <AccountCircle style={{ marginRight: "10px",  color:"blue"}} />
                          <Typography variant="h6"><b>Choriste:</b> {`${users.nom} ${users.prenom}`}</Typography>
                        </div>
                        <Typography variant="body1">Tessiture Vocale: <b style={{ color: 'green' }}>{`${users.tessitureVocale}`}</b></Typography>
                        <Typography variant="body1" style={{ color: 'blue' }}>Historique de status:</Typography>
                        {users.historiqueActivite.map((activity, index) => (
                          <div key={index}>
                            <Typography variant="body2" style={{ marginLeft: "20px" }}>
                              <b>Saison:</b> {activity.Saison}, <b>Statut:</b> {activity.status}
                            </Typography>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ChoristeStatus;
