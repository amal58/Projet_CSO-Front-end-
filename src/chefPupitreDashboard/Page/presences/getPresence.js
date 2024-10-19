import React, { useEffect, useState } from "react";
import SideMenu from "../../Component/SideMenuu";
import AppHeader from "../../Component/AppHeadere";
import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";

function GetPresences() {
  const [repetitions, setRepetitions] = useState([]);
  const [selectedRepetition, setSelectedRepetition] = useState("");
  const [presences, setPresences] = useState([]);
  useEffect(() => {
    if (selectedRepetition) {
      const tessitureVocale = JSON.parse(localStorage.getItem('user')).tessitureVocale
      fetchPresences(tessitureVocale, selectedRepetition);
      console.log("hi" + tessitureVocale);
    }
  }, [selectedRepetition]);

  // Fonction pour récupérer toutes les répétitions
  // Fonction pour récupérer toutes les répétitions
  const fetchRepetitions = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/get/All"
      );
      const data = await response.json();
      setRepetitions(data.repetitions); // Assurez-vous que 'data.repetitions' contient le tableau des répétitions
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des répétitions :", error);
    }
  };

  // Fonction pour récupérer les présences des choristes pour une répétition spécifique
  // Fonction pour récupérer les présences des choristes pour une répétition spécifique
  const fetchPresences = async (tessitureVocale, selectedRepetition) => {
    if (selectedRepetition) {
      console.log(selectedRepetition);
      console.log("bbbb" + tessitureVocale);
      try {
        const response = await fetch(
          `http://localhost:3000/api/absences/getpresencepupitre/${tessitureVocale}/${selectedRepetition}`
        );
        const data = await response.json();
        setPresences(data);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des présences :", error);
      }
    }
  };

  // À l'intérieur de useEffect

  useEffect(() => {
    fetchRepetitions();
  }, []);

  const handleRepetitionChange = (event) => {
    setSelectedRepetition(event.target.value);
  };

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
                &nbsp;&nbsp; <b>Liste des Répétitions</b>
              </h1>
              <br />

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                        <select
                          value={selectedRepetition}
                          onChange={handleRepetitionChange}
                        >
                          <option value="">Sélectionner une répétition</option>
                          {repetitions.map((repetition) => (
                            <option key={repetition._id} value={repetition._id}>
                              {repetition.lieu}
                            </option>
                          ))}
                        </select>

                        <Button onClick={fetchPresences}>
                          Afficher les présences
                        </Button>
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
                      </tr>
                    </thead>
                    <tbody>
                      {presences.map((presence) => (
                        <tr key={presence._id}>
                          <td>{presence.choriste.nom}</td>
                          <td>{presence.choriste.prenom}</td>
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

export default GetPresences;