import React, { useEffect, useState } from "react";
import AppHeader from "../../Components/AppHeader";
//import SideMenu from "../../Components/SideMenuChoriste";
import SideMenu from "../../Components/SideMenu";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";
import Swal from "sweetalert2";
import {
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
function Getrepetition() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [concertId, setConcertId] = useState("");
  const [concerts, setConcerts] = useState([]);
  const [sop, setSop] = useState(0);
  const [al, setAl] = useState(0);
  const [ten, setTen] = useState(0);
  const [bas, setBas] = useState(0);
  const [programme, setProgramme] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    getRepetition();
    fetchConcerts();
    fetchProgrammes();
  }, []);

  async function getRepetition() {
    try {
      let result = await fetch("http://localhost:3000/api/repetition/get/All", {
        method: "GET",
      });
      result = await result.json();

      if (Array.isArray(result.repetitions)) {
        setData(result.repetitions);
      } else {
        console.error("Aucune donnée trouvée ou données au format inattendu");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  async function deleteRepetition(id) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/repetition/supprimer/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setData(data.filter((repetition) => repetition._id !== id));
      } else {
        console.error(
          "La suppression a échoué avec le statut :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  }

  async function search(key) {
    try {
      let result;
      if (key === "") {
        result = await fetch("http://localhost:3000/api/repetition/get/All");
      } else {
        result = await fetch(`http://localhost:3000/api/repetition/get/${key}`);
      }
      result = await result.json();

      if (Array.isArray(result.repetitions)) {
        setData(result.repetitions);
      } else {
        console.error("Les données récupérées ne sont pas au format attendu");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  }

  const handleEditClick = (repetition) => {
    setShowForm(true);
    setSelectedItem(repetition);
    setConcertId(repetition.concert._id);

    // Mettez à jour le champ 'programme' pour qu'il affiche correctement le programme sélectionné
    const selectedProgrammeIds = repetition.programme.map(
      (programme) => programme._id
    );
    setSelectedItem({
      ...repetition,
      programme: selectedProgrammeIds, // Utilisez les IDs des programmes sélectionnés
    });
  };
  //hathi ili kant tdem handleEditClick
  /*
  const handleEditClick = (repetition) => {
    setShowForm(true);
    setSelectedItem(repetition);
    setConcertId(repetition.concert._id);
  };
*/
  /*
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItem || !concertId) {
      return;
    }

    try {
      const updatedItem = {
        heureDebut: selectedItem.heureDebut,
        heureFin: selectedItem.heureFin,
        date: selectedItem.date,
        lieu: selectedItem.lieu,
        programme: selectedItem.programme,
        concert: concertId,
      };

      const response = await fetch(
        `http://localhost:3000/api/repetition/repetition/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        await getRepetition();
        setShowForm(false);
        setSelectedItem(null);
      } else {
        console.error("Erreur lors de la modification :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };*/
  /*
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItem || !concertId) {
      return;
    }

    try {
      const updatedItem = {};

      // Vérifiez et ajoutez uniquement les champs modifiés à updatedItem
      if (selectedItem.lieu !== "") {
        updatedItem.lieu = selectedItem.lieu;
      }
      if (selectedItem.programme !== "") {
        updatedItem.programme = selectedItem.programme;
      }

      if (selectedItem.heureFin !== "") {
        updatedItem.heureFin = selectedItem.heureFin;
      }
      if (selectedItem.heureDebut !== "") {
        updatedItem.heureDebut = selectedItem.heureDebut;
      }
      if (selectedItem.date !== "") {
        updatedItem.date = selectedItem.date;
      }
      if (selectedItem.date !== "") {
        updatedItem.date = selectedItem.date;
      }
      if (selectedItem.concert !== "") {
        updatedItem.concert = selectedItem.concert;
      }
      if (selectedItem.sop !== "") {
        updatedItem.sop = selectedItem.sop;
      }
      if (selectedItem.al !== "") {
        updatedItem.al = selectedItem.al;
      }
      if (selectedItem.ten !== "") {
        updatedItem.ten = selectedItem.ten;
      }
      if (selectedItem.bas !== "") {
        updatedItem.bas = selectedItem.bas;
      }
      // Ajoutez d'autres champs modifiés de la même manière

      const response = await fetch(
        `http://localhost:3000/api/repetition/repetition/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        await getRepetition();
        setShowForm(false);
        setSelectedItem(null);
      } else {
        console.error("Erreur lors de la modification :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };*/

  //hathi t5dem
  /*
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItem || !concertId) {
      return;
    }

    try {
      const updatedItem = {};

      // Vérifiez et ajoutez uniquement les champs modifiés à updatedItem
      if (
        typeof selectedItem.lieu !== "undefined" &&
        selectedItem.lieu !== null
      ) {
        updatedItem.lieu = selectedItem.lieu;
      }
      if (
        typeof selectedItem.programme !== "undefined" &&
        selectedItem.programme !== null
      ) {
        updatedItem.programme = selectedItem.programme;
      }
      if (
        typeof selectedItem.heureFin !== "undefined" &&
        selectedItem.heureFin !== null
      ) {
        updatedItem.heureFin = selectedItem.heureFin;
      }
      if (
        typeof selectedItem.heureDebut !== "undefined" &&
        selectedItem.heureDebut !== null
      ) {
        updatedItem.heureDebut = selectedItem.heureDebut;
      }
      if (
        typeof selectedItem.date !== "undefined" &&
        selectedItem.date !== null
      ) {
        updatedItem.date = selectedItem.date;
      }
      if (
        typeof selectedItem.concert !== "undefined" &&
        selectedItem.concert !== null
      ) {
        updatedItem.concert = selectedItem.concert;
      }
      if (
        typeof selectedItem.sop !== "undefined" &&
        selectedItem.sop !== null
      ) {
        updatedItem.sop = selectedItem.sop;
      }
      if (typeof selectedItem.al !== "undefined" && selectedItem.al !== null) {
        updatedItem.al = selectedItem.al;
      }
      if (
        typeof selectedItem.ten !== "undefined" &&
        selectedItem.ten !== null
      ) {
        updatedItem.ten = selectedItem.ten;
      }
      if (
        typeof selectedItem.bas !== "undefined" &&
        selectedItem.bas !== null
      ) {
        updatedItem.bas = selectedItem.bas;
      }
      // Ajoutez d'autres champs modifiés de la même manière

      const response = await fetch(
        `http://localhost:3000/api/repetition/repetition/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        await getRepetition();
        setShowForm(false);
        setSelectedItem(null);
      } else {
        console.error("Erreur lors de la modification :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };*/

  const handleEditSubmit = async (event) => {
    event.preventDefault();

    if (!selectedItem || !concertId) {
      return;
    }

    try {
      const updatedItem = {};

      // Vérifiez et ajoutez uniquement les champs modifiés à updatedItem
      if (
        typeof selectedItem.lieu !== "undefined" &&
        selectedItem.lieu !== null
      ) {
        updatedItem.lieu = selectedItem.lieu;
      }
      if (
        typeof selectedItem.programme !== "undefined" &&
        selectedItem.programme !== null
      ) {
        updatedItem.programme = selectedItem.programme;
      }
      if (
        typeof selectedItem.heureFin !== "undefined" &&
        selectedItem.heureFin !== null
      ) {
        updatedItem.heureFin = selectedItem.heureFin;
      }
      if (
        typeof selectedItem.heureDebut !== "undefined" &&
        selectedItem.heureDebut !== null
      ) {
        updatedItem.heureDebut = selectedItem.heureDebut;
      }
      if (
        typeof selectedItem.date !== "undefined" &&
        selectedItem.date !== null
      ) {
        updatedItem.date = selectedItem.date;
      }
      if (
        typeof selectedItem.concert !== "undefined" &&
        selectedItem.concert !== null
      ) {
        updatedItem.concert = selectedItem.concert;
      }
      if (
        typeof selectedItem.sop !== "undefined" &&
        selectedItem.sop !== null
      ) {
        updatedItem.sop = selectedItem.sop;
      }
      if (typeof selectedItem.al !== "undefined" && selectedItem.al !== null) {
        updatedItem.al = selectedItem.al;
      }
      if (
        typeof selectedItem.ten !== "undefined" &&
        selectedItem.ten !== null
      ) {
        updatedItem.ten = selectedItem.ten;
      }
      if (
        typeof selectedItem.bas !== "undefined" &&
        selectedItem.bas !== null
      ) {
        updatedItem.bas = selectedItem.bas;
      }

      // Mettez à jour également les champs "sop" et "al" si modifiés
      if (typeof sop !== "undefined" && sop !== null) {
        updatedItem.sop = sop;
      }
      if (typeof al !== "undefined" && al !== null) {
        updatedItem.al = al;
      }

      // Ajoutez d'autres champs modifiés de la même manière

      const response = await fetch(
        `http://localhost:3000/api/repetition/repetition/${selectedItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (response.ok) {
        await getRepetition();
        setShowForm(false);
        setSelectedItem(null);
        Swal.fire(
          "Succès !",
          "L' absence a été ajoutée avec succès.",
          "success"
        );
      } else {
        console.error("Erreur lors de la modification :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };
  const handleChangeProgramme = (e) => {
    setSelectedItem({
      ...selectedItem,
      programme: e.target.value,
    });
  };
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
                        &nbsp;&nbsp;{" "}
                        <TextField
                          label="Search"
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
                  {!showForm && (
                    <table className="tablC" width="1000px">
                      <thead>
                        <tr className="head">
                          <th>Lieu</th>
                          <th>Date</th>
                          <th>Heure de début</th>
                          <th>Heure de fin</th>

                          <th>Choriste</th>
                          <th>lieu de concert</th>
                          <th>date de concert</th>
                          <th>Programme</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody style={{ marginRight: "-2000px" }}>
                        {data.map((repetition) => (
                          <tr key={repetition._id}>
                            <td>{repetition.lieu}</td>
                            <td>
                            {repetition.date.split('T')[0]}
                            </td>
                            <td>{repetition.heureDebut}</td>
                            <td>{repetition.heureFin}</td>

                            {/* <td>{repetition.choriste.join(", ")}</td>*/}
                            <td>
                              {repetition.choriste.map((choriste, index) => (
                                <React.Fragment key={index}>
                                  {choriste.nom} {choriste.prenom}
                                  {index !== repetition.choriste.length - 1 && (
                                    <br />
                                  )}{" "}
                                  {/* Ajoute un <br /> si ce n'est pas le dernier choriste */}
                                </React.Fragment>
                              ))}
                            </td>

                            <td>{repetition.concert.lieu}</td>
                            <td>
                              {repetition.concert.date.split('T')[0]}{" "}
                            </td>
                            <td>
                              {repetition.programme &&
                                repetition.programme.map((program, index) => (
                                  <React.Fragment key={index}>
                                    {program.titre}
                                    {/* Ajoute un <br /> si ce n'est pas le dernier programme */}
                                    {index !==
                                      repetition.programme.length - 1 && <br />}
                                  </React.Fragment>
                                ))}
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: "5px" }}>
                                <IconButton
                                  style={{ color: "green" }}
                                  onClick={() => handleEditClick(repetition)}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    deleteRepetition(repetition._id)
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {showForm && selectedItem && (
                    <div className="container">
                      <div className="container" style={{ width: 1500 }}>
                        <form
                          className="form-container"
                          onSubmit={handleEditSubmit}
                          style={{ marginLeft: -200, marginTop: -50 }}
                        >
                          <div className="form-group">
                            <label htmlFor="lieu">Lieu</label>
                            <input
                              id="lieu"
                              type="text"
                              value={selectedItem && selectedItem.lieu}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  lieu: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <InputLabel id="programme-label">
                              Programme
                            </InputLabel>
                            <Select
                              labelId="programme-label"
                              value={selectedItem && selectedItem.programme}
                              onChange={handleChangeProgramme} // Utilisez handleChangeProgramme comme gestionnaire d'événements onChange
                              multiple
                              style={{ width: 300 }}
                            >
                              <MenuItem value="">
                                Sélectionner un ou plusieurs programmes
                              </MenuItem>
                              {programmes.map((programme) => (
                                <MenuItem
                                  key={programme._id}
                                  value={programme._id}
                                >
                                  {programme.titre}
                                </MenuItem>
                              ))}
                            </Select>
                            {formSubmitted && !programme && (
                              <FormHelperText className="error-message">
                                Le champ Programme est obligatoire
                              </FormHelperText>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="sop">Nombre de SOP</label>
                            <input
                              id="sop"
                              type="number"
                              value={selectedItem && selectedItem.sop}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  sop: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="al">Nombre de AL</label>
                            <input
                              id="al"
                              type="number"
                              value={selectedItem && selectedItem.al}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  al: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="ten">Nombre de TEN</label>

                            {/* <input
                              id="ten"
                              type="number"
                              value={ten}
                              onChange={(e) => setTen(e.target.value)}
                            />*/}

                            <input
                              id="bas"
                              type="number"
                              value={selectedItem && selectedItem.ten}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  ten: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="bas">Nombre de BAS</label>
                            <input
                              id="bas"
                              type="number"
                              value={selectedItem && selectedItem.bas}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  bas: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input
                              id="date"
                              type="date"
                              value={
                                selectedItem && selectedItem.date
                                  ? new Date(selectedItem.date)
                                      .toISOString()
                                      .substring(0, 10)
                                  : ""
                              }
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  date: e.target.value,
                                })
                              }
                            />
                          </div>

                          <div className="form-group">
                            <label htmlFor="heureDebut">Heure de début</label>
                            <input
                              id="heureDebut"
                              type="time"
                              value={selectedItem && selectedItem.heureDebut}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  heureDebut: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="heureFin">Heure de fin</label>
                            <input
                              id="heureFin"
                              type="time"
                              value={selectedItem && selectedItem.heureFin}
                              onChange={(e) =>
                                setSelectedItem({
                                  ...selectedItem,
                                  heureFin: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="concert">Concert</label>
                            {/*  <select
                              id="concert"
                              value={concertId}
                              onChange={(e) => setConcertId(e.target.value)}
                            >
                              <option value="">Sélectionner un concert</option>
                              {concerts.map((concert) => (
                                <option key={concert._id} value={concert._id}>
                                  {new Date(concert.date).toLocaleDateString()}{" "}
                                  - {concert.lieu}
                                </option>
                              ))}
                            </select>*/}

                            <select
                              id="concert"
                              value={concertId} // Utilisation de concertId comme valeur par défaut
                              onChange={(e) => setConcertId(e.target.value)}
                            >
                              <option value="">Sélectionner un concert</option>
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
                              Modifier
                            </button>
                            <button
                              className="cancel"
                              onClick={() => {
                                setShowForm(false);
                                setSelectedItem(null);
                              }}
                            >
                              Annuler
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
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

export default Getrepetition;

