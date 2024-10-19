
import React, { useState, useEffect } from "react";
import SideMenu from "../Component/SideMenuu";
import AppHeader from "../Component/AppHeadere";
import "./index.css";
import Swal from "sweetalert2";
function Absences3() {
  const [showMainForm, setShowMainForm] = useState(true);
  const [raison_absence, setRaison_absence] = useState("");
  const [concertId, setConcertId] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [repetitionId, setRepetitionId] = useState("");
  const [repetitions, setRepetitions] = useState([]);
  const [dates_absence, setDates_absence] = useState([]);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState();
  useEffect(() => {
   
    setUserId(JSON.parse(localStorage.getItem('user'))._id)
      fetchRepetitions();
      fetchConcerts();
    
    
  }, []);
  const [users, setUsers] = useState(null);

  console.log(localStorage.getItem("token"))
  
  const fetchRepetitions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/repetition/getrepetitionbychoriste/${JSON.parse(localStorage.getItem('user'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setRepetitions(data);
      } else {
        console.error(
          "Format de réponse des répétitions non pris en charge :",
          data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des répétitions :", error);
    }
  };

  const fetchConcerts = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Ne pas réassigner userId ici
      const response = await fetch(
        `http://localhost:3000/api/concert2/consertbychoristepresnet/abc/${JSON.parse(localStorage.getItem('user'))._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data); // Afficher les données récupérées dans la console
      if (Array.isArray(data)) {
        setConcerts(data);
      } else {
        console.error(
          "Format de réponse des concerts non pris en charge :",
          data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des concerts :", error);
    }
  };

  const handleConcertChange = (e) => {
    setConcertId(e.target.value);
  };
  /*
  const handleRepetitionClick = () => {
    setShowMainForm(false);
  };*/

  const handleRepetitionClick = () => {
    setShowMainForm(false);
    resetForm();
  };

  const handleConcertClick = () => {
    setShowMainForm(true);
    resetForm();
  };
  const handleRepetitionChange = (e) => {
    setRepetitionId(e.target.value);
  };

  const handleCancelClick = () => {
    setShowMainForm(true);
    resetForm();
    setError(""); // Ajoutez cette ligne pour réinitialiser les messages d'erreur
  };

  const addAbsence = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/absences/abs/ab/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      Swal.fire("Erreur !", "Impossible d'ajouter la absence.", "error");
      console.error("Erreur lors de l'ajout de l'absence :", error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (!dates_absence.includes(selectedDate)) {
      setDates_absence([...dates_absence, selectedDate]);
    }
  };
  /*
  const resetForm = () => {
    setRaison_absence("");
    setConcertId("");
    setRepetitionId("");
    setDates_absence([]);
  };

  const addAbsence2 = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/absences/abs/ab",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            raison_absence: raison_absence,
            dates_absence: dates_absence,
            repetitions: repetitionId,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      Swal.fire("Succès !", "L' absence a été ajoutée avec succès.", "success");
      resetForm();
    } catch (error) {
      Swal.fire("Erreur !", "Impossible d'ajouter la absence.", "error");
      console.error("Erreur lors de l'ajout de l'absence :", error);
    }
  };
*/
  const resetForm = () => {
    setRaison_absence("");
    setConcertId("");
    setRepetitionId("");
    setDates_absence([]);
    document.getElementById("date").value = "jj/mm/yyyy";
    setError("");
  };

  const addAbsence2 = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:3000/api/absences/abs/ab/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      resetForm(); // Réinitialiser le formulaire après succès

      // hathi zedetha taw
      if (dates_absence.length > 0) {
        setRaison_absence("");
        setDates_absence([]);

        setRepetitionId("");
        document.getElementById("date").value = "jj/mm/yyyy";
      }
    } catch (error) {
      Swal.fire("Erreur !", "Impossible d'ajouter la absence.", "error");
      console.error("Erreur lors de l'ajout de l'absence :", error);
    }
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (!raison_absence || !repetitionId || !dates_absence.length) {
      setError("Champs obligatoires *");
      return;
    } else {
      setError(""); // Réinitialiser l'état de l'erreur une fois que tous les champs sont remplis
    }
    addAbsence2();
  };

  const removeDate = (dateToRemove) => {
    const updatedDates = dates_absence.filter((date) => date !== dateToRemove);
    setDates_absence(updatedDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!raison_absence || !concertId || !dates_absence.length) {
      setError("Champs obligatoires *");
      return;
    } else {
      setError(""); // Réinitialiser l'état de l'erreur une fois que tous les champs sont remplis
    }
    addAbsence();
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
                      <form
                        className="form-container"
                        onSubmit={handleSubmit}
                        style={{ marginRight: "-550px" }}
                      >
                        <div className="form-group">
                          <label htmlFor="lieu">Raison d'absence</label>
                          <input
                            id="  Raison"
                            type="text"
                            value={raison_absence}
                            onChange={(e) => setRaison_absence(e.target.value)}
                          />
                          {error && !raison_absence && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="date">Date</label>
                          <input
                            id="date"
                            type="date"
                            onChange={handleDateChange}
                          />
                          {error && dates_absence.length === 0 && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
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
                            {concerts.map((concert) => (
                              <option key={concert._id} value={concert._id}>
                                {new Date(concert.date).toLocaleDateString()} -{" "}
                                {concert.titre}
                              </option>
                            ))}
                          </select>
                          {error && !concertId && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
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
                        style={{ marginRight: "-550px" }}
                        className="form-container"
                        onSubmit={handleSubmit2}
                      >
                        <div className="form-group">
                          <label htmlFor="lieu">Raison d'absence</label>
                          <input
                            id="  Raison"
                            type="text"
                            value={raison_absence}
                            onChange={(e) => setRaison_absence(e.target.value)}
                          />
                          {error && !raison_absence && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="date">Date</label>
                          <input
                            id="date"
                            type="date"
                            onChange={handleDateChange}
                          />
                          {error && dates_absence.length === 0 && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
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
                          {error && !repetitionId && (
                            <div className="error-message">
                              Champ obligatoire *
                            </div>
                          )}
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
              {/* <div className="btn-group">
                <button className="repetition" onClick={handleRepetitionClick}>
                  Répétition
                </button>
            </div>*/}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Absences3;