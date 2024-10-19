import React, { useEffect, useState } from "react";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import image from '../../assets/OIP-removebg-preview (2).png';
import swal from 'sweetalert';
function formatHeure(heureStr) {
  // Convertir la chaîne de date en objet Date
  const dateHeureDebut = new Date(heureStr);

  // Extraire l'heure et les minutes
  const heures = dateHeureDebut.getHours();
  const minutes = dateHeureDebut.getMinutes();

  // Formater l'heure pour l'affichage
  let heureFormatee = heures % 12; // Convertir l'heure au format 12 heures
  if (heureFormatee === 0) heureFormatee = 12; // Si l'heure est 0, la convertir en 12
  const suffixe = heures >= 12 ? 'PM' : 'AM'; // Déterminer si c'est AM ou PM

  const heureSimple = `${heureFormatee}:${minutes < 10 ? '0' : ''}${minutes} ${suffixe}`;

  return heureSimple;
}

function fetchApi(concertId) {
    fetch(`http://localhost:3000/concerts/dispoToConcert/${concertId}`)
    .then(response => {
       
    })
    .then(data => {
     
        swal({
            title: "Les emails ont été envoyés avec succès",
            icon: "success",
            button: "Valider",
        });
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données de l'API :", error);
        swal({
            title: "Erreur",
            text: "Une erreur s'est produite lors de l'envoi des emails.",
            icon: "error",
            button: "Ok",
        });
    });
}


function IndiquerDispo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getConcerts();
  }, []);

  async function getConcerts() {
    try {
      let result = await fetch(
        "http://localhost:3000/concerts/concertsAll",
        {
          method: "GET",
        }
      );
      result = await result.json();
      setData(result.concerts);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  async function search(key) {
    try {
      let result;
      if (key === "") {
        result = getConcerts();
      } else {
        result = await fetch("http://localhost:3000/searchConcert/" + key);
      }
      result = await result.json();
      console.log("resultat", result);
      if (result) {
        setData(result);
      } else {
        console.error("Les données récupérées ne sont pas au format attendu");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  function handleImageClick(concertId) {
    fetchApi(concertId);
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
                &nbsp;&nbsp; <b>Indiquer Disponiblité aux concerts</b>
              </h1>
              <br />

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                        &nbsp;&nbsp;{" "}
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

                <div className="w-full overflow-x-auto">
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                        <th>Titre concert</th>
                        <th>Date</th>
                        <th>Lieu</th>
                        <th>Heure début</th>
                        <th>Heure Fin</th>
                        <th>Indiquer Disponibilité</th>
                      </tr>
                    </thead>
                    <tbody style={{ marginRight: "-2000px" }}>
                      {Array.isArray(data) && data.map((audition) => (
                        <tr key={audition._id}>
                          <td style={{ paddingRight: "20px" }}>
                            &nbsp;&nbsp;&nbsp; {audition.titre}
                          </td>
                          <td style={{ paddingRight: "20px" }}>
                            &nbsp;&nbsp;&nbsp; {audition.date.substring(0, 10)}
                          </td>
                          <td style={{ paddingRight: "20px" }}>
                            &nbsp;&nbsp;&nbsp; {audition.lieu}
                          </td>
                          <td style={{ paddingRight: "20px" }}>
                            &nbsp;&nbsp;&nbsp; {formatHeure(audition.heuredébut)}
                          </td>
                          <td style={{ paddingRight: "20px" }}>
                            &nbsp;&nbsp;&nbsp; {formatHeure(audition.heurefin)}
                          </td>
                          <td style={{ paddingRight: "20px", alignContent: 'center', alignItems: 'center' }}>
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <img
                              src={image}
                              style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                              onClick={() => handleImageClick(audition._id)}
                            />
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
    </div>
  );
}

export default IndiquerDispo;
