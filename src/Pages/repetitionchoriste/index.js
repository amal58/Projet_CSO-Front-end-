import { useForm } from "react-hook-form";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import img from "../../assets/ecrvain.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/*
function Repetetion() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prenom, setPrenom] = useState("");
  const [Num_tel, setNum_tel] = useState("");
  const [heureDebut, setHeureDebut] = useState(null); // Utilisez null pour initier à aucun choix
  const [heureFin, setHeureFin] = useState(null); // Utilisez null pour initier à aucun choix
  const [date, setDate] = useState(new Date()); // Utilisez new Date() pour obtenir la date actuelle
  const [lieu, setLieu] = useState("");
  const [al, setAl] = useState("");
  const [sop, setSop] = useState("");
  const [ten, setTen] = useState("");
  const [base, setBase] = useState("");
  const [programme, setProgramme] = useState("");
  const [concertId, setConcertId] = useState("");

  const [concerts, setConcerts] = useState([]);
  const [times, setTimes] = useState([]);

  const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

  const [error, setError] = useState(false);
  const [errorss, setErrors] = useState(false);

  // jdida

  const convertUTCtoLocal = (date) => {
    // Créez un objet Date à partir de la valeur UTC
    const utcDate = new Date(date);

    // Récupérez le temps local en ajoutant le décalage de fuseau horaire
    const localDate = new Date(
      utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
    );

    return localDate;
  };
  // Fonction pour charger la liste des concerts depuis l'API
  async function fetchConcerts() {
    try {
      const response = await fetch("http://localhost:3000/api/concert2/getAll");
      const data = await response.json();

      // Si la réponse est un tableau, mettez à jour l'état des concerts
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

  // Fonction pour charger la liste des temps depuis l'API
  async function fetchTimes() {
    try {
      const response = await fetch("http://localhost:3000/times");
      const data = await response.json();

      // Si la réponse est un objet avec un champ "times"
      if (Array.isArray(data.times)) {
        setTimes(data.times);
      } else if (Array.isArray(data)) {
        // Si la réponse est déjà un tableau
        setTimes(data);
      } else {
        console.error("Format de réponse des temps non pris en charge :", data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des temps :", error);
    }
  }

  useEffect(() => {
    fetchConcerts();
    fetchTimes();
  }, []);

  async function Add() {
    if (
      !heureDebut ||
      !heureFin ||
      !date ||
      !lieu ||
      !concertId ||
      {
        /*!programme */
/*  }
    ) {
      setError(true);
      setErrors(false);
      return false;
    }

    let item = {
      heureDebut,
      heureFin,
      date,
      lieu,
      al,
      sop,
      ten,

      concert: concertId, // Ajoutez l'ID du concert ici
    };
    console.warn(item);

    let result = await fetch(
      "http://localhost:3000/api/repetition/ajout/reptition",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    result = await result.json();
    console.warn(result);
  }

  return (
    <section>
      <div className="App1">
        <AppHeader></AppHeader>
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <div className="registers">
            <div className="col-11">
              <form id="forms" className="flex flex-col" action="#">
               
            
      /*          <div className="input-container">
                  <input
                    type="text"
                    placeholder="Lieu"
                    className="input-field blue-border"
                    onChange={(e) => setLieu(e.target.value)}
                  />
                  {/* <input
                    type="text"
                    placeholder="Programme"
                    className="input-field blue-border"
                    onChange={(e) => setProgramme(e.target.value)}
                  />*/
/*          </div>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                />

                <div>
                  <label htmlFor="heureDebut">Heure de début:</label>
                  <input
                    type="time"
                    id="heureDebut"
                    value={heureDebut}
                    onChange={(e) => setHeureDebut(e.target.value)}
                  />
                </div>
                {/*<DatePicker
                  selected={heureDebut}
                  onChange={(heure) => setHeureDebut(heure)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  dateFormat="HH:mm"
                  timeCaption="Heure de début"
  />*/

/*      <div>
                  <label htmlFor="heureFin">Heure de fin:</label>
                  <input
                    type="time"
                    id="heureFin"
                    value={heureFin}
                    onChange={(e) => setHeureFin(e.target.value)}
                  />
                </div>

                {/*  <select onChange={(e) => setConcertId(e.target.value)}>
                  <option value="">Sélectionner un concert</option>
                  {concerts.map((concert) => (
                    <option key={concert._id} value={concert._id}>
                      {new Date(concert.date).toLocaleDateString()} -{" "}
                      {concert.lieu}
                    </option>
                  ))}
                </select>*/
/*<select
                  value={concertId}
                  onChange={(e) => setConcertId(e.target.value)}
                >
                  <option value="">Sélectionner un concert</option>
                  {concerts.map((concert) => (
                    <option key={concert._id} value={concert._id}>
                      {new Date(concert.date).toLocaleDateString()} -{" "}
                      {concert.lieu}
                    </option>
                  ))}
                </select>

               
              /*  <div className="inline-fields">
                  <input
                    type="text"
                    placeholder="AL"
                    className="input-field blue-border"
                    onChange={(e) => setAl(e.target.value)}
                    maxLength={3} // Limiter à 3 caractères
                  />
                  <input
                    type="text"
                    placeholder="SOP"
                    className="input-field"
                    onChange={(e) => setSop(e.target.value)}
                    maxLength={3} // Limiter à 3 caractères
                  />
                  <input
                    type="text"
                    placeholder="TEN"
                    className="input-field blue-border"
                    onChange={(e) => setTen(e.target.value)}
                    maxLength={3} // Limiter à 3 caractères
                  />
                  <input
                    type="text"
                    placeholder="Base"
                    className="input-field blue-border"
                    onChange={(e) => setBase(e.target.value)}
                    maxLength={3} // Limiter à 3 caractères
                  />
                </div>

                <button className="btn" onClick={() => Add()}>
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Repetetion;*/
/*
function Repetetion() {
  const [heureDebut, setHeureDebut] = useState(null);
  const [heureFin, setHeureFin] = useState(null);
  const [date, setDate] = useState(new Date());
  const [lieu, setLieu] = useState("");
  const [al, setAl] = useState("");
  const [sop, setSop] = useState("");
  const [ten, setTen] = useState("");
  const [base, setBase] = useState("");
  const [concert, setConcert] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [programme, setProgramme] = useState("");
  const [programmes, setProgrammes] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false); // État pour suivre si le formulaire a été soumis

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/concert2/getAll");
      const data = await response.json();

      if (Array.isArray(data.model)) {
        setConcerts(data.model);
        console.log(concert._id);
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

  useEffect(() => {
    fetchOeuvre();
  }, []);

  const fetchOeuvre = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Oeuv/getAll");
      const data = await response.json();

      if (Array.isArray(data.model)) {
        setProgrammes(data.model);
        console.log(programme._id);
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
  /* const handleSubmit = async (e) => {
    e.preventDefault();

    const item = {
      heureDebut,
      heureFin,
      date,
      lieu,
      al,
      sop,
      ten,
      concertId,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/ajout/reptition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        // Si la requête réussit, affichez une alerte de succès
        Swal.fire(
          "Succès !",
          "La répétition a été ajoutée avec succès.",
          "success"
        );
      } else {
        // Sinon, affichez une alerte d'erreur
        Swal.fire("Erreur !", "Impossible d'ajouter la répétition.", "error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };*/

/*
  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormSubmitted(true);
    if (!heureDebut || !heureFin || !date || !lieu || !concert || !programme) {
      return; // Si non, ne rien faire (le message d'erreur sera affiché)
    }

    const item = {
      heureDebut,
      heureFin,
      date,
      lieu,
      al,
      sop,
      ten,
      concert,
      programme,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/ajout/reptition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        // Si la requête réussit, affichez une alerte de succès
        Swal.fire(
          "Succès !",
          "La répétition a été ajoutée avec succès.",
          "success"
        );
      } else {
        // Sinon, affichez une alerte d'erreur
        Swal.fire("Erreur !", "Impossible d'ajouter la répétition.", "error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };

  return (
    <section>
      <div className="App1">
        <AppHeader></AppHeader>
        <div className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <div className="registers">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Lieu"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
              />
              {formSubmitted && !lieu && (
                <p className="error-message">Le champ Lieu est obligatoire</p>
              )}
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat="dd/MM/yyyy"
              />
              {formSubmitted && !date && (
                <p className="error-message">Le champ Date est obligatoire</p>
              )}
              <input
                type="time"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
              />
              {formSubmitted && !heureDebut && (
                <p className="error-message">
                  Le champ Heure de début est obligatoire
                </p>
              )}
              <input
                type="time"
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
              />
              {formSubmitted && !heureFin && (
                <p className="error-message">
                  Le champ Heure de fin est obligatoire
                </p>
              )}
              <select
                value={concert}
                onChange={(e) => setConcert(e.target.value)}
              >
                <option value="">Sélectionner un concert</option>
                {concerts.map((concert) => (
                  <option key={concert._id} value={concert._id}>
                    {new Date(concert.date).toLocaleDateString()} -{" "}
                    {concert.lieu}
                  </option>
                ))}
              </select>
              {formSubmitted && !concert && (
                <p className="error-message">
                  Le champ Concert est obligatoire
                </p>
              )}
              <select
                value={programme}
                onChange={(e) =>
                  setProgramme(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
              >
                <option value="">
                  Sélectionner un ou plusieurs programmes
                </option>
                {programmes.map((programme) => (
                  <option key={programme._id} value={programme._id}>
                    {programme.titre}
                  </option>
                ))}
              </select>
              {formSubmitted && !programme && (
                <p className="error-message">
                  Le champ Programme est obligatoire
                </p>
              )}
              <div className="inline-fields">
                <input
                  type="text"
                  placeholder="AL"
                  value={al}
                  onChange={(e) => setAl(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="SOP"
                  value={sop}
                  onChange={(e) => setSop(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="TEN"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Base"
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                />
              </div>
              <button type="submit">Ajouter</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Repetetion;
*/ import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import CalendarIcon from "@material-ui/icons/CalendarToday";
// Assurez-vous d'avoir le fichier CSS approprié avec ces styles

function Repetetion() {
  const [heureDebut, setHeureDebut] = useState(null);
  const [heureFin, setHeureFin] = useState(null);
  const [date, setDate] = useState(new Date());
  const [lieu, setLieu] = useState("");
  const [al, setAl] = useState("");
  const [sop, setSop] = useState("");
  const [ten, setTen] = useState("");
  const [bas, setBas] = useState("");
  const [concert, setConcert] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [programme, setProgramme] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchConcerts();
    fetchProgrammes();
  }, []);

  const fetchConcerts = async () => {
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
  };

  const fetchProgrammes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Oeuv/getAll");
      const data = await response.json();

      if (Array.isArray(data.model)) {
        setProgrammes(data.model);
      } else {
        console.error(
          "Format de réponse des programmes non pris en charge :",
          data
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des programmes :", error);
    }
  };

  // hathi ili kant tmchi
  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!heureDebut || !heureFin || !date || !lieu || !concert || !programme) {
      return;
    }

    const item = {
      heureDebut,
      heureFin,
      date,
      lieu,
      al,
      sop,
      ten,
      concert,
      programme,
      bas,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/ajout/reptition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        Swal.fire(
          "Succès !",
          "La répétition a été ajoutée avec succès.",
          "success"
        );
      } else {
        Swal.fire("Erreur !", "Impossible d'ajouter la répétition.", "error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };*/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!heureDebut || !heureFin || !date || !lieu || !concert || !programme) {
      return;
    }

    const item = {
      heureDebut,
      heureFin,
      date,
      lieu,
      al,
      sop,
      ten,
      concert,
      programme,
      bas,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/repetition/ajout/reptition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.ok) {
        Swal.fire(
          "Succès !",
          "La répétition a été ajoutée avec succès.",
          "success"
        );

        setHeureDebut("--:--");
        setHeureFin("--:--");
        setDate(new Date());
        setLieu("");
        setAl("");
        setSop("");
        setTen("");
        setBas("");
        setConcert("");
        setProgramme([]);
        setFormSubmitted(false);
      } else {
        Swal.fire("Erreur !", "Impossible d'ajouter la répétition.", "error");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête :", error);
    }
  };
  return (
    <section>
      <div className="App1">
        {/* Remplacez ces composants fictifs par vos vrais composants */}
        <AppHeader />
        <div className="SideMenuAndPageContent">
          <SideMenu />
          <div className="form-container-wrapper">
            <br /> <br />
            <form
              onSubmit={handleSubmit}
              style={{ marginLeft: 350 }}
              className="form-container"
            >
              <TextField
                label="Lieu"
                value={lieu}
                onChange={(e) => setLieu(e.target.value)}
                required
                fullWidth
              />
              {formSubmitted && !lieu && (
                <FormHelperText className="error-message">
                  Le champ Lieu est obligatoire
                </FormHelperText>
              )}
              <FormControl
                required
                fullWidth
                style={{ marginTop: "60px", width: "100%" }}
              >
                <InputLabel
                  htmlFor="date-picker"
                  style={{ marginTop: "-50px", width: "100%" }}
                >
                  Date de répétition
                </InputLabel>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="dd/MM/yyyy"
                  required
                  placeholderText="Sélectionner une date"
                  className="date-picker"
                  id="date-picker" // Id pour l'association avec le label
                  style={{ marginTop: "60px", width: "100%" }} // Ajout de styles pour ressembler au TextField
                />
              </FormControl>
              {formSubmitted && !date && (
                <FormHelperText className="error-message">
                  Le champ Date est obligatoire
                </FormHelperText>
              )}
              <TextField
                type="time"
                label="Heure de début"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ style: { marginTop: "-20px" } }} // Ajustez cette valeur selon vos besoins
              />

              {formSubmitted && !heureDebut && (
                <FormHelperText className="error-message">
                  Le champ Heure de début est obligatoire
                </FormHelperText>
              )}
              <br></br>
              <TextField
                type="time"
                label="Heure de fin"
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
                required
                fullWidth
                InputLabelProps={{ style: { marginTop: "-20px" } }}
              />
              {formSubmitted && !heureFin && (
                <FormHelperText className="error-message">
                  Le champ Heure de fin est obligatoire
                </FormHelperText>
              )}
              <br></br>
              <FormControl required fullWidth>
                <InputLabel id="concert-label">Concert</InputLabel>
                <Select
                  labelId="concert-label"
                  value={concert}
                  onChange={(e) => setConcert(e.target.value)}
                >
                  <MenuItem value="">Sélectionner un concert</MenuItem>
                  {concerts.map((concert) => (
                    <MenuItem key={concert._id} value={concert._id}>
                      {new Date(concert.date).toLocaleDateString()} -{" "}
                      {concert.lieu}
                    </MenuItem>
                  ))}
                </Select>
                {formSubmitted && !concert && (
                  <FormHelperText className="error-message">
                    Le champ Concert est obligatoire
                  </FormHelperText>
                )}
              </FormControl>
              <br></br>
              <FormControl required fullWidth>
                <InputLabel id="programme-label">Programme</InputLabel>
                <Select
                  labelId="programme-label"
                  value={programme} // programme doit être un tableau pour la sélection multiple
                  onChange={(e) => setProgramme(e.target.value)}
                  multiple
                >
                  <MenuItem value="">
                    Sélectionner un ou plusieurs programmes
                  </MenuItem>
                  {programmes.map((programme) => (
                    <MenuItem key={programme._id} value={programme._id}>
                      {programme.titre}
                    </MenuItem>
                  ))}
                </Select>
                {formSubmitted && !programme && (
                  <FormHelperText className="error-message">
                    Le champ Programme est obligatoire
                  </FormHelperText>
                )}
              </FormControl>
              <br></br>
              <div className="inline-fields">
                <TextField
                  label="AL"
                  value={al}
                  onChange={(e) => setAl(e.target.value)}
                />
                <TextField
                  label="SOP"
                  value={sop}
                  onChange={(e) => setSop(e.target.value)}
                />
                <TextField
                  label="TEN"
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
                <TextField
                  label="Base"
                  value={bas}
                  onChange={(e) => setBas(e.target.value)}
                />
              </div>
              <br />
              <Button type="submit" variant="contained" color="primary">
                Ajouter
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Repetetion;