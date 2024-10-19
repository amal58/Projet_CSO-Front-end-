// Frontend: Choristee.js
import React, { useEffect, useState } from "react";
import SideMenu from "../../Component/SideMenuu";
import AppHeader from "../../Component/AppHeadere";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
import { Grid } from "@material-ui/core";
import swal from 'sweetalert';


function PresenceRep() {
  const [data, setData] = useState([]);
  const [openPopUp, setOpenPopup] = useState(false);
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [selectedChoriste, setSelectedChoriste] = useState(null);
  const [id, setSelectedConcert] = useState("");
  const [concertsList, setConcertsList] = useState([]);
  const [raison, setRaison] = useState("");
  const [present, setPresent] = useState(false); // Initialisez à false

  useEffect(() => {
    getChoriste();
    getRep();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setToken(JSON.parse(localStorage.getItem('user')).tessitureVocale);
    }
  }, []);

  async function getChoriste() {
    try {
      let result = await fetch(
        "http://localhost:3000/api/utilisateur/choristes/" +(JSON.parse(localStorage.getItem('user')).tessitureVocale),
        {
          method: "GET",
        }
      );
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  async function getRep(choristeId) {
    try {
      console.log('Fetching repetitions for choristeId:', choristeId);
      let result = await fetch(
        `http://localhost:3000/api/repetition/get/All/${choristeId}`,
        {
          method: "GET",
        }
      );
      result = await result.json();
      console.log('Repetitions:', result.repetitions);
      setConcertsList(result.repetitions.map(rep => ({ id: rep._id, date: rep.date })));
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
  




  async function search(key) {
    try {
        let result;
        if (key === "") {
            result = await fetch("http://localhost:3000/api/utilisateur/choristes/" + (JSON.parse(localStorage.getItem('user')).tessitureVocale));
        } else {
            // Ajoutez la tessiture vocale à la requête
            const tessitureVocale = JSON.parse(localStorage.getItem('user')).tessitureVocale;
            result = await fetch(`http://localhost:3000/searchh/${key}/${tessitureVocale}`);
        }
        result = await result.json();
        console.log("resultat", result);
        if (result && result) {
            setData(result);
        } else {
            console.error("Les données récupérées ne sont pas au format attendu");
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
}

const handleCheckChange = (choristeId) => {
  setOpenPopup(true);
  getRep(choristeId); // Passer choristeId à getRep
};


  const close = () => {
    setOpenPopup(false);
  };

  const handleConcertSelect = (event) => {
    setSelectedConcert(event.target.value);
  };

  const handleMarquerPresence = async () => {
    try {
      console.log('idChoriste: ' + selectedChoriste);
      console.log('idRep: ' + id); // Affiche l'identifiant de la répétition sélectionnée
      const response = await fetch(`http://localhost:3000/api/marquerManuellement_repitition/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          choriste: selectedChoriste,
          present: present,
          raisonAjoutManuellement: raison,
        }),
      });
  
      if (response.ok) {
        swal({
          title: "Présence marquée avec succès",
          icon: "success",
          button: "Valider",
        });
        close();
      } else {
        console.error('Erreur lors du marquage de présence :', response.status);
      }
    } catch (error) {
      console.error('Erreur lors du marquage de présence :', error);
    }
  };
  

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div style={{ borderRadius: "50px" }}>
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0" style={{ borderRadius: "50px" }}>
              <h1 className="text-3xl my-2">
                <br />
                &nbsp;&nbsp; &nbsp;&nbsp; <b>Liste des Choristes de groupe pupitre: <b style={{ color: "blue" }}>  {user?.groupe_Pupitre}</b></b>
              </h1>
              <h4 className="text-3xl my-2">  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;<u style={{ color: "gray" }}>Marquer présence à une répétition</u></h4>
              <br />
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                        &nbsp;&nbsp; &nbsp;&nbsp;
                        <TextField
                          label="         Search"
                          onChange={(e) => search(e.target.value)}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton>
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Etat</th>
                        <th>Tessiture Vocale</th>
                       
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((audition) => (
                        <tr key={audition._id}>
                          <td>{audition.nom}</td>
                          <td>{audition.prenom}</td>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{audition.email}</td>
                          <td>&nbsp;&nbsp;{audition.etat}</td>
                          <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b style={{ color: "green" }}>{audition.tessitureVocale}</b></td>
                        
                          <td>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button style={{
                              backgroundColor: 'rgb(208, 212, 214)',
                              color: 'black',
                              padding: '10px 20px',
                              borderRadius: '5px',
                              border: 'none',
                              cursor: 'pointer'
                            }} onClick={() => {
                              handleCheckChange(audition._id);
                              setSelectedChoriste(audition._id);
                            }}>
                              Marquer Présence
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Popup pour marquer la présence */}
      {openPopUp &&
        <div
          className="overlay"
          style={{
            zIndex: 1000,
            position: "absolute",
            top: 150,
            left: 550,
            transform: "translate(-50%, -40%)",
          }}
        >
          <div className="modalContainer">
            <div className="modalRight" style={{ textAlign: "center" }}>
              <br />
              <div className="content">
                <h2><u>Marquer Présence</u></h2>
                <br/>
                <b style={{color:'green'}}>Répetition:  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </b>
                &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;<select value={id} onChange={handleConcertSelect} style={{width:"300px" , borderRadius:"5px" , height:"40px"}}>
               &nbsp;&nbsp;&nbsp;  {concertsList.map(rep => (
                    <option key={rep.id} value={rep.id}>{rep.date}</option>
                  ))}
                </select>
                <br/>
                <TextField
                  style={{ width: "100%" }}
                  id="initial"
                  label="Raison  Ajout manuelle"
                  type="text"
                  placeholder="Raison Ajout manuelle"
                  variant="outlined"
                  spellCheck="false"
                  autoComplete="off"
                  onChange={(e) => {
                    setRaison(e.target.value);
                  }}
                />
                <br/>
                <div>
  <label>
    <input
      type="checkbox"
      checked={present === true} // Vérifie si 'present' est égal à true
      onChange={(e) => setPresent(true)} // Met à jour 'present' à true si la case est cochée
    />
    Présent
  </label>
  &nbsp;&nbsp;&nbsp;&nbsp;
  <label>
    <input
      type="checkbox"
      checked={present === false} // Vérifie si 'present' est égal à false
      onChange={(e) => setPresent(false)} // Met à jour 'present' à false si la case est cochée
    />
    Absent
  </label>
</div>
                <Grid item xs={12}></Grid>
                <Grid item xs={12} style={{ textAlign: "center" }}>
                  <br/>
                  <hr></hr>
                  <br/>
                  <button onClick={handleMarquerPresence} style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Marquer
                  </button> &nbsp;&nbsp;
                  <button onClick={close} style={{
                    backgroundColor: '#4caf50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    Annuler
                  </button>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default PresenceRep;
