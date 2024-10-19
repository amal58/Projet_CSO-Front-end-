/*import React, { useEffect, useState } from "react";
import AppHeader from "../../Components/AppHeaderPupitre";
import SideMenu from "../../Components/SideMenuPupitre";
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

function GetPrsencesByProgramme() {
  const [oeuvres, setOeuvres] = useState([]);
  const [selectedOeuvres, setSelectedOeuvres] = useState([]);
  const [presences, setPresences] = useState([]);
  const [selectedRepetition, setSelectedRepetition] = useState("");
  const [tessitureVocale, setTessitureVocale] = useState(""); // Utilisation de useState pour la tessiture vocale

  useEffect(() => {
    fetchRepetitions();
    const tessiture = localStorage.getItem("tessitureVocale"); // Récupération de la tessiture vocale depuis le localStorage
    if (tessiture) {
      setTessitureVocale(tessiture);
      console.log("Tessiture vocale :", tessiture); // Ajout du console.log pour vérifier la valeur
    }
  }, []);

  const fetchRepetitions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Oeuv/getAll");
      const data = await response.json();
      setOeuvres(data.model);
    } catch (error) {
      console.error("Erreur lors de la récupération des répétitions :", error);
    }
  };

  const handleOeuvreChange = (event) => {
    setSelectedOeuvres(
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
    console.log(selectedOeuvres); // Ajouter cette ligne pour afficher les id sélectionnés dans la console
  };

  const handleRepetitionChange = (event) => {
    setSelectedRepetition(event.target.value);
  };
  console.log(tessitureVocale);
  const fetchPresences = async () => {
    try {
      console.log(tessitureVocale);
      console.log("mmm" + selectedOeuvres);
      const response = await fetch(
        `http://localhost:3000/api/absences/aaadd/presence/abc/abc/${tessitureVocale}/${selectedOeuvres.join(
          ","
        )}`
      );
      const data = await response.json();
      setPresences(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des présences :", error);
    }
  };

  const handleValidation = () => {
    if (selectedRepetition && selectedOeuvres.length > 0 && tessitureVocale) {
      console.log();
      fetchPresences(tessitureVocale);
    }
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
                          multiple
                          value={selectedOeuvres}
                          onChange={handleOeuvreChange}
                        >
                          <option value="">Sélectionner une répétition</option>
                          {oeuvres.map((oeuvre) => {
                            return (
                              <option key={oeuvre._id} value={oeuvre._id}>
                                {oeuvre.titre}
                              </option>
                            );
                          })}
                        </select>

                        <Button onClick={handleValidation}>
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

export default GetPrsencesByProgramme;*/

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

function GetPrsencesByProgramme() {
  const [oeuvres, setOeuvres] = useState([]);
  const [selectedOeuvres, setSelectedOeuvres] = useState([]);
  const [presences, setPresences] = useState([]);
  const [selectedRepetition, setSelectedRepetition] = useState("");
  const [tessitureVocale, setTessitureVocale] = useState(""); // Utilisation de useState pour la tessiture vocale

  useEffect(() => {
    fetchRepetitions();
    const tessiture = JSON.parse(localStorage.getItem('user')).tessitureVocale; // Récupération de la tessiture vocale depuis le localStorage
    if (tessiture) {
      setTessitureVocale(tessiture);
      console.log("Tessiture vocale :", tessiture); // Ajout du console.log pour vérifier la valeur
    }
  }, []);

  const fetchRepetitions = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Oeuv/getAll");
      const data = await response.json();
      setOeuvres(data.model);
    } catch (error) {
      console.error("Erreur lors de la récupération des répétitions :", error);
    }
  };

  const handleOeuvreChange = (event) => {
    setSelectedOeuvres((prevSelectedOeuvres) =>
      Array.from(event.target.selectedOptions, (option) => option.value)
    );
  };

  useEffect(() => {
    console.log(selectedOeuvres);
  }, [selectedOeuvres]);

  const handleRepetitionChange = (event) => {
    setSelectedRepetition(event.target.value);
  };
  /*
  const fetchPresences = async () => {
    try {
      console.log(tessitureVocale);
      console.log("Selected Oeuvres: ", selectedOeuvres);
      const response = await fetch(
        `http://localhost:3000/api/absences/aaadd/presence/abc/abc/${tessitureVocale}/${selectedOeuvres.join(
          ","
        )}`
      );
      const data = await response.json();
      setPresences(data);
      console.log(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des présences :", error);
    }
  };
*/
  const fetchPresences = async () => {
    console.log("Fetching presences..."); // Vérifiez si fetchPresences est appelée
    try {
      console.log(tessitureVocale);
      console.log("Selected Oeuvres: ", selectedOeuvres);
      const response = await fetch(
        `http://localhost:3000/api/absences/aaadd/presence/abc/abc/${tessitureVocale}/${selectedOeuvres.join(
          ","
        )}`
      );
      const data = await response.json();
      console.log("bbbb" + data);
      setPresences(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des présences :", error);
    }
  };

  const handleValidation = () => {
    if (selectedOeuvres.length > 0 && tessitureVocale) {
      console.log("Validation triggered!"); // Vérifiez si la validation est déclenchée
      fetchPresences(); // Appelez fetchPresences sans passer tessitureVocale
    }
  };

  console.log(presences);
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
                          multiple
                          value={selectedOeuvres}
                          onChange={handleOeuvreChange}
                        >
                          <option value="">Sélectionner une répétition</option>
                          {oeuvres.map((oeuvre) => {
                            return (
                              <option key={oeuvre._id} value={oeuvre._id}>
                                {oeuvre.titre}
                              </option>
                            );
                          })}
                        </select>

                        <Button onClick={handleValidation}>
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
                      {presences.map((presence) => {
                        return (
                          <tr key={presence._id}>
                            <td>{presence.choriste.nom}</td>
                            <td>{presence.choriste.prenom}</td>
                          </tr>
                        );
                      })}
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

export default GetPrsencesByProgramme;
