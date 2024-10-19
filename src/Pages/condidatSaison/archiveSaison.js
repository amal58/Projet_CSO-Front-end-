import React, { useEffect, useState } from "react";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
function ArchiveSaison() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAuditions();
  }, []);
  async function getAuditions() {
    try {
      let result = await fetch(
        "http://localhost:3000/auditions/getcondidatbysaison/saison/audition",
        {
          method: "GET",
        }
      );
      result = await result.json();

  
      if (Array.isArray(result) && result.length > 0) {
        setData(result);
      } else {
        console.error("Aucun candidat trouvé ou données au format inattendu");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }
  
  async function search(key) {
    try {
      let result;
      if (key === "") {
        result = await fetch("http://localhost:3000/auditions/getcondidatbysaison/saison/audition");
      } else {
        result = await fetch("http://localhost:3000/auditions/audition/filtreSaison/" + key);
      }
      result = await result.json();
      console.log("resultat", result);
      if (result ) {
        setData(result);
      } else {
        console.error("Les données récupérées ne sont pas au format attendu");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
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
                <br/>
               &nbsp;&nbsp; <b>Liste des Candidats Archivés</b>
              </h1>
              <br />
            
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                     &nbsp;&nbsp; <TextField
  label="         Search"

  onChange={(e)=>search(e.target.value)}  
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton >
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
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Sexe</th>
                        <th>tessiture Vocale</th>
                        <th>décision</th>
                      </tr>
                    </thead>
                    <tbody style={{ marginRight: "-2000px" }}>
                    {data.map((audition) => (
  <tr key={audition._id}>
    <td style={{ paddingRight: "20px" }}>
      {audition.condidat && audition.condidat.nom}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.condidat && audition.condidat.prenom}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.condidat && audition.condidat.email}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.condidat && audition.condidat.telephone}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.condidat && audition.condidat.sexe}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.tessitureVocale}
    </td>
    <td style={{ paddingRight: "20px" }}>
      {audition.décision}
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

export default ArchiveSaison;
