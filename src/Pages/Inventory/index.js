import React, { useEffect, useState } from "react";
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
function Inventory() {
  const [data, setData] = useState([]);
  const [checkedCandidates, setCheckedCandidates] = useState([]);

  useEffect(() => {
    getAuditions();
  }, []);

  async function getAuditions() {
    try {
      let result = await fetch(
        "http://localhost:3000/auditions/audition/get/get/get",
        {
          method: "GET",
        }
      );
      result = await result.json();

      if (result && result.candidats) {
        setData(result.candidats);
      } else {
        console.error("Les données récupérées ne sont pas au format attendu");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  const handleCheckChange = (candidateId) => {
    if (checkedCandidates.includes(candidateId)) {
      setCheckedCandidates(
        checkedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setCheckedCandidates([...checkedCandidates, candidateId]);
    }
  };

  const sendEmailToCheckedCandidates = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Condidat/addk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ candidates: checkedCandidates }),
      });

      if (response.ok) {
        alert("Emails envoyés avec succès !");
   
        setCheckedCandidates([]);
      } else {
        console.error(
          "Erreur lors de l'envoi des emails :",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des emails :", error);
    }
  };

  async function search(key) {
    try {
      let result;
      if (key === "") {
        result = await fetch("http://localhost:3000/auditions/audition/get/get/get");
      } else {
        result = await fetch("http://localhost:3000/auditions/audition/filtre/" + key);
      }
      result = await result.json();
      console.log("resultat", result);
      if (result && result.candidats) {
        setData(result.candidats);
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
        <div style={{ borderRadius: "50px" }}>
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div
              className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0"
              style={{ borderRadius: "50px" }}
            >
              <h1 className="text-3xl my-2">
                <br />
                &nbsp;&nbsp; &nbsp;&nbsp; <b>Liste des Candidats</b>
              </h1>
              <br />
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                        &nbsp;&nbsp; &nbsp;&nbsp;{" "}
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
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        &nbsp;&nbsp;{" "}
                        <button
                          style={{
                            height: "40px",
                            backgroundColor: "white",
                            borderRadius: "6px",
                          }}
                          onClick={sendEmailToCheckedCandidates}
                        >
                          Inviter Pour audition
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{width:"100px"}}>
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Sexe</th>
                        <th>décision</th>
                        <th>email envoyé</th>
                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Tessiture Vocale
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(data).map(([auditionId, auditions]) =>
                        auditions.map((audition) => (
                          <tr key={audition._id}>
                            <td>{audition.condidat.nom}</td>
                            <td>{audition.condidat.prenom}</td>
                            <td>{audition.condidat.email}</td>
                            <td>{audition.condidat.telephone}</td>
                            <td>{audition.condidat.sexe}</td>
                            <td>{audition.décision}</td>
                            <td
                              className={`${
                                audition.envoi_email
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>  {audition.envoi_email ? "oui" : "non"}</b>
                            </td>

                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {audition.tessitureVocale}{" "}
                            </td>
                            <td>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <FormControlLabel
                                style={{ marginBottom: "5px" }}
                                control={
                                  <Checkbox
                                    checked={checkedCandidates.includes(
                                      audition.condidat._id
                                    )}
                                    onChange={() =>
                                      handleCheckChange(audition.condidat._id)
                                    }
                                  />
                                }
                              />
                            </td>
                          </tr>
                        ))
                      )}
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

export default Inventory;