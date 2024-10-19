import React, { useState, useEffect } from "react";
import SideMenu from "../Component/SideMenuu";
import AppHeader from "../Component/AppHeadere";
import "./index.css";
import Swal from "sweetalert2";
function Absences() {
  const [showMainForm, setShowMainForm] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [raison_absence, setRaison_absence] = useState("");
  const [concertId, setConcertId] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [repetitionId, setRepetitionId] = useState("");
  const [repetitions, setRepetitions] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [dates_absence, setDates_absence] = useState([]);
  const [userId, setUserId] = useState();
  useEffect(() => {
   
    setUserId(JSON.parse(localStorage.getItem('user'))._id)
    fetchConcerts();
  }, []);

  useEffect(() => {
    fetchRepetitions();
  }, [concertId]);

  async function fetchConcerts() {
    try {
      const response = await fetch("http://localhost:3000/api/concert2/getAll");
      const data = await response.json();

      if (Array.isArray(data.model)) {
        setConcerts(data.model);
      } else {
        console.error(
          "Format de réponse des concerts non pris en charge :",
          data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des concerts :", error);
    }
  }

  async function fetchRepetitions() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/get/All"
      );
      const data = await response.json();

      if (Array.isArray(data.repetitions)) {
        setRepetitions(data.repetitions);
      } else {
        console.error(
          "Format de réponse des répétitions non pris en charge :",
          data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des répétitions :", error);
    }
  }

  const handleCancelClick = () => {
    setShowMainForm(true);
    setSelectedItem(null);
  };

  const handleConcertChange = (e) => {
    setConcertId(e.target.value);
  };

  const handleRepetitionChange = (e) => {
    setRepetitionId(e.target.value);
    const selectedRepetition = repetitions.find(
      (repetition) => repetition._id === e.target.value
    );
    setSelectedItem(selectedRepetition);
  };
  useEffect(() => {
    // Récupérer l'e-mail de l'utilisateur depuis le localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      // Rediriger vers la page de connexion si l'e-mail n'est pas trouvé
      console.log("nnn"); // Utiliser history.push pour la redirection
    }
  }, []);

  const addAbsence = async () => {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token JWT du localStorage

      const response = await fetch(
        `http://localhost:3000/api/absences/abs/ab/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclure le token JWT dans les en-têtes
          },
          body: JSON.stringify({
            raison_absence: raison_absence,
            dates_absences: dates_absence,
            concert: concertId,
            repetitions: repetitionId ? [repetitionId] : null,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire("Succès !", "L' absence a été ajoutée avec succès.", "success");
      if (dates_absence.length > 0) {
        setRaison_absence("");
        setDates_absence([]);

        setConcertId("");
        document.getElementById("date").value = "jj/mm/yyyy";
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'absence :", error);
    }
  };
  const addAbsence2 = async () => {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token JWT du localStorage

      const response = await fetch(
        `http://localhost:3000/api/absences/abs/ab/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclure le token JWT dans les en-têtes
          },
          body: JSON.stringify({
            raison_absence: raison_absence,
            dates_absences: dates_absence,
            repetitions: repetitionId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire("Succès !", "L' absence a été ajoutée avec succès.", "success");
      if (dates_absence.length > 0) {
        setRaison_absence("");
        setDates_absence([]);

        setRepetitionId("");
        document.getElementById("date").value = "jj/mm/yyyy";
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'absence :", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addAbsence();
  };
  const handleSubmit2 = (e) => {
    e.preventDefault();
    addAbsence2();
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!dates_absence.includes(selectedDate)) {
      setDates_absence([...dates_absence, selectedDate]);
    }
  };

  const removeDate = (dateToRemove) => {
    const updatedDates = dates_absence.filter((date) => date !== dateToRemove);
    setDates_absence(updatedDates);
  };

  const resetForm = () => {
    setRaison_absence("");
    setConcertId("");
    setRepetitionId("");
    setDates_absence([]);
    document.getElementById("date").value = "jj/mm/yyyy";
  };
  const handleConcertClick = () => {
    setShowMainForm(true);
    resetForm();
  };
  const handleRepetitionClick = () => {
    setShowMainForm(false);
    resetForm();
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
                &nbsp;&nbsp; <b>Enregistrer absence</b>
              </h1>
              <br />

              {showMainForm ? (
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="w-full overflow-x-auto">
                    <div className="container">
                      <div className="container">
                        <form
                          className="form-container"
                          onSubmit={handleSubmit}
                          style={{ marginRight: "-550px" }}
                        >
                          <div className="form-group">
                            <label htmlFor="lieu">Lieu</label>
                            <input
                              id="  Raison"
                              type="text"
                              value={raison_absence}
                              onChange={(e) =>
                                setRaison_absence(e.target.value)
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                              id="date"
                              type="date"
                              onChange={handleDateChange}
                            />
                            <div>
                              {dates_absence.map((date) => (
                                <span key={date}>
                                  {date}
                                  <button onClick={() => removeDate(date)}>
                                    Supprimer
                                  </button>
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="concert">Concert</label>
                            <select
                              id="concert"
                              value={concertId}
                              onChange={(e) => setConcertId(e.target.value)}
                            >
                              <option value="">Sélectionner un concert</option>
                              {/* Boucle sur les concerts pour créer les options */}
                              {concerts.map((concert) => (
                                <option key={concert._id} value={concert._id}>
                                  {new Date(concert.date).toLocaleDateString()}{" "}
                                  - {concert.lieu}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="btn-group">
                            <button className="modify" type="submit">
                              Ajouter
                            </button>
                            <button
                              className="cancel"
                              onClick={() => {
                                setSelectedItem(null);
                              }}
                            >
                              Annuler
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      border: "none",
                      color: "white",
                      padding: "15px 32px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16px",
                      margin: "4px 2px",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                    onClick={handleRepetitionClick}
                  >
                    Répétition
                  </button>
                </div>
              ) : (
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                  <div className="w-full overflow-x-auto">
                    <div className="container">
                      <form
                        className="form-container"
                        onSubmit={handleSubmit2}
                        style={{ marginRight: "-550px" }}
                      >
                        <div className="form-group">
                          <label htmlFor="lieu">Lieu</label>
                          <div className="form-group">
                            <label htmlFor="lieu">Lieu</label>
                            <input
                              id="  Raison"
                              type="text"
                              value={raison_absence}
                              onChange={(e) =>
                                setRaison_absence(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="date">Date</label>
                          <input
                            id="date"
                            type="date"
                            onChange={handleDateChange}
                          />
                          <div>
                            {dates_absence.map((date) => (
                              <span key={date}>
                                {date}
                                <button onClick={() => removeDate(date)}>
                                  Supprimer
                                </button>
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="repetition">Répétition</label>
                          <select
                            id="repetition"
                            value={repetitionId}
                            onChange={handleRepetitionChange}
                          >
                            <option value="">
                              Sélectionner une répétition
                            </option>
                            {repetitions.map((repetition) => (
                              <option
                                key={repetition._id}
                                value={repetition._id}
                              >
                                {new Date(repetition.date).toLocaleDateString()}{" "}
                                - {repetition.lieu}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="btn-group">
                          <button className="modify" type="submit">
                            Ajouter
                          </button>
                          <button
                            className="cancel"
                            onClick={handleCancelClick}
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <button
                    className="concert"
                    style={{
                      backgroundColor: "#4CAF50",
                      border: "none",
                      color: "white",
                      padding: "15px 32px",
                      textAlign: "center",
                      textDecoration: "none",
                      display: "inline-block",
                      fontSize: "16px",
                      margin: "4px 2px",
                      cursor: "pointer",
                      borderRadius: "8px",
                    }}
                    onClick={handleConcertClick}
                  >
                    Concert
                  </button>
                </div>
              )}
              {/* Bouton pour basculer entre les deux formulaires */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Absences;