import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import axios from 'axios';


function Saison() {
  const [data, setData] = useState([]);
  const [SaisonName, setSaisonName] = useState("");
  const [editableIndex, setEditableIndex] = useState(-1);
  const [oeuvreNames] = useState([]);
  const [selectingChefs, setSelectingChefs] = useState(false);
  const [users, setUsers] = useState([]);
  const [chefPupitre1, setChefPupitre1] = useState("");
  const [chefPupitre2, setChefPupitre2] = useState("");
  const [pupitreSelection, setPupitreSelection] = useState(""); // Nouvel état pour stocker le pupitre sélectionné
  const [choristes, setChoristes] = useState([]);
  const [ setFilteredUsers] = useState([]);
  const [CompMap, setCompMap] = useState({});


  function handleButtonClick() {
    setSelectingChefs(true); 
  }
  function handlePupitreSelection(pupitre) {
    const filtered = users.filter(user => user.pupitre === pupitre);
    setFilteredUsers(filtered);
  }
  useEffect(() => {
    if (pupitreSelection) {
      const filteredChoristes = users.filter(user => user.pupitre === pupitreSelection);
      console.log("Utilisateurs filtrés pour le pupitre sélectionné :", filteredChoristes);
      setChoristes(filteredChoristes);
    } else {
      // Si aucun pupitre sélectionné, afficher tous les choristes
      setChoristes(users);
    }
  }, [pupitreSelection, users]);
  useEffect(() => {
    getAllSaisons();
    fetchUsers();
  }, []);
  function handleCloseModal() {
    setSelectingChefs(false);
    setPupitreSelection("");
    setChefPupitre1("");
    setChefPupitre2("");
  }
  const [oeuvreMap, setOeuvreMap] = useState({});

  useEffect(() => {
    // Fonction pour récupérer les données des œuvres
    const fetchOeuvres = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Oeuv/getAll');
        const oeuvres = response.data.model;

        // Créer un objet de correspondance ID -> titre
        const oeuvreMapping = {};
        oeuvres.forEach(oeuvre => {
          oeuvreMapping[oeuvre._id] = oeuvre.titre;
        });

        setOeuvreMap(oeuvreMapping);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres:', error);
      }
    };

    fetchOeuvres();
  }, []);

  useEffect(() => {
    // Fonction pour récupérer les données des œuvres
    const fetchComp = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Comp/getAll');
        const oeuvres = response.data.model;

        // Créer un objet de correspondance ID -> titre
        const oeuvreMapping = {};
        oeuvres.forEach(comp => {
          oeuvreMapping[comp._id] = comp.nom;
        });

        setCompMap(oeuvreMapping);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres:', error);
      }
    };

    fetchComp();
  }, []);
  async function getAllSaisons() {
    try {
      const response = await fetch("http://localhost:3000/api/saison/afficher");
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result.model);
    } catch (error) {
      console.error("Erreur lors de la récupération des saisons :", error);
      swal("Erreur", "Une erreur est survenue lors de la récupération des saisons.", "error");
    }
  }

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/utilisateur/getAll/all");
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const responseData = await response.json();
  
      // Assuming the response has a "choristes" array within the responseData
      setUsers(responseData.choristes || []);
      
      // Afficher les utilisateurs dans la console
      console.log("Utilisateurs récupérés :", responseData);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      swal("Erreur", "Une erreur est survenue lors de la récupération des utilisateurs.", "error");
    }
  }
  const [ArrMap, setArrMap] = useState({});
  useEffect(() => {
    // Fonction pour récupérer les données des œuvres
    const fetchArrangeurs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Arrg/getAll');
        const arrng = response.data.model;

        // Créer un objet de correspondance ID -> titre
        const arrMapping = {};
        arrng.forEach(arr => {
          arrMapping[arr._id] =arr.nom;
        });

        setArrMap(arrMapping);
      } catch (error) {
        console.error('Erreur lors de la récupération des œuvres:', error);
      }
    };

    fetchArrangeurs();
  }, []);

 const [CondMap, setCondMap] = useState({});
  useEffect(() => {
    // Fonction pour récupérer les données des œuvres
    const fetchcondidats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Condidat/getAll');
        const arrng = response.data.model;

        // Créer un objet de correspondance ID -> titre
        const arrMapping = {};
        arrng.forEach(cond => {
          arrMapping[cond._id] =cond.nom;
        });

        setCondMap(arrMapping);
      } catch (error) {
        console.error('Erreur lors de la récupération des condidats:', error);
      }
    };

    fetchcondidats();
  }, []);

  useEffect(() => {
    console.log("Utilisateurs mis à jour :", users);
  }, [users]);
  
  async function designateChefs() {
    if (!pupitreSelection || !chefPupitre1 || !chefPupitre2) {
      swal("Erreur", "Veuillez sélectionner le pupitre et les chefs de pupitre avant de valider.", "error");
      return;
    }
  
    const designateData = [
      {
        pupitre: pupitreSelection,
        userIds: [chefPupitre1, chefPupitre2]
      }
    ];
  
    try {
      const response = await fetch("http://localhost:3000/api/utilisateur/designer2chefspupitre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(designateData)
      });
  
      if (!response.ok) {
        throw new Error('Failed to designate chefs');
      }
  
      const responseData = await response.json();
      console.log("Réponse de la désignation des chefs :", responseData);
  
      // Extraire les noms et les rôles des chefs de pupitre
      const chef1 = choristes.find(user => user._id === chefPupitre1);
      const chef2 = choristes.find(user => user._id === chefPupitre2);
  
      // Afficher le message de succès avec les noms et les rôles des chefs
      swal("Succès", `Les chefs de pupitre ont été désignés avec succès.\nChef 1: ${chef1.nom} ${chef1.prenom}, ${pupitreSelection}\nChef 2: ${chef2.nom} ${chef2.prenom}, ${pupitreSelection}`, "success");
      
      setSelectingChefs(false); // Fermer le modal après la validation
    } catch (error) {
      console.error("Erreur lors de la désignation des chefs de pupitre :", error);
      swal("Erreur", "Une erreur est survenue lors de la désignation des chefs de pupitre.", "error");
    }
  }
  

  async function handleUpdate(index) {
    try {
      const saisonToUpdate = data[index];
      const response = await fetch(`http://localhost:3000/api/saison/modif/${saisonToUpdate._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          SaisonName: saisonToUpdate.SaisonName,
          dateDebut: saisonToUpdate.dateDebut,
          dateFin: saisonToUpdate.dateFin
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update season");
      }

      const updatedSaison = await response.json();
      setData(data.map((s, i) => i === index ? updatedSaison.model : s));
      setEditableIndex(-1);
      swal("Success", "Saison mise à jour avec succès.", "success");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la saison :", error);
      swal("Erreur", "Une erreur est survenue lors de la mise à jour de la saison.", "error");
    }
  }

  async function handleDelete(id) {
    try {
      const shouldDelete = await swal({
        title: "Êtes-vous sûr?",
        text: "Êtes-vous sûr de supprimer cette saison ?",
        icon: "warning",
        buttons: ["Annuler", "Oui"],
        dangerMode: true,
      });

      if (!shouldDelete) {
        return;
      }

      const response = await fetch(`http://localhost:3000/api/saison/supprimer/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete season");
      }

      const result = await response.json();
      if (result.success) {
        setData(data.filter(saison => saison._id !== id));
        swal("Success", "Saison supprimée avec succès.", "success");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la saison :", error);
      swal("Erreur", "Une erreur est survenue lors de la suppression de la saison.", "error");
    }
  }

  async function AjoutSaison() {
    try {
      const formattedDate = new Date().toISOString().slice(0, 10);

      const response = await fetch("http://localhost:3000/api/saison/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          SaisonName: SaisonName,
          dateDebut: formattedDate,
          dateFin: formattedDate
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add season");
      }

      await response.json();
      setSaisonName("");
      swal("Success", "Saison ajoutée avec succès.", "success");

      getAllSaisons();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la saison :", error);
      swal("Erreur", "Une erreur est survenue lors de l'ajout de la saison.", "error");
    }
  }

  function formatDateForInput(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div className="">
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
              <h1 className="text-3xl my-2 custom-heading">
                <b>Liste des Saisons</b>
                <div className="button-container">
                  <div className="input-container">
                    <input
                      type="text"
                      placeholder='Nom de la saison'
                      id="saisonName"
                      className="form-control"
                      value={SaisonName}
                      onChange={(e) => setSaisonName(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-primary custom-btn" onClick={AjoutSaison}>Ajouter saison</button>
                </div>
              </h1>
              <br /><br />
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="w-full overflow-x-auto">
                  <div className="w-full overflow-x-auto table-container">
                    <table className="tablC">
                      <thead>
                        <tr className="head">
                          <th>Actions</th>
                          <th>Nom</th>
                          <th>Date début</th>
                          <th>Date fin</th>
                          <th>Archivée </th>
                          <th>Utilisateurs</th>
                          <th>Oeuvres</th>
                        
                          <th>Candidats</th>
                         
                          <th>Répétitions</th>
                          <th>Concerts</th>
                          <th>Compositeurs</th>
                          <th>Arrangeurs</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((saison, index) => (
                          <tr key={index}>
                            <td>
                              {editableIndex === index ? (
                                <button className="btn btn-primary custom-btn " onClick={() => handleUpdate(index)}>
                                  Valider
                                </button>
                              ) : (
                                <>
                                  <button className="btn btn-primary custom-btn" onClick={() => setEditableIndex(index)}>
                                    Modifier
                                  </button>
                                </>
                              )}
                              <button className="btn btn-primary custom-btn1" onClick={() => { handleButtonClick(); }}>Add chefs</button>
                              <button className="btn btn-danger custom-btn3" onClick={() => handleDelete(saison._id)}>
                                Supprimer
                              </button>
                            </td>

                            <td>
                              {editableIndex === index ? (
                                <input
                                  type="text"
                                  value={saison.SaisonName}
                                  onChange={(e) => {
                                    const newData = [...data];
                                    newData[index].SaisonName = e.target.value;
                                    setData(newData);
                                  }}
                                />
                              ) : (
                                saison.SaisonName
                              )}
                            </td>
                            <td>
                              {editableIndex === index ? (
                                <input
                                  type="date"
                                  value={formatDateForInput(saison.dateDebut)}
                                  onChange={(e) => {
                                    const newData = [...data];
                                    newData[index].dateDebut = e.target.value;
                                    setData(newData);
                                  }}
                                />
                              ) : (
                                formatDateForDisplay(saison.dateDebut)
                              )}
                            </td>
                            <td>
                              {editableIndex === index ? (
                                <input
                                  type="date"
                                  value={formatDateForInput(saison.dateFin)}
                                  onChange={(e) => {
                                    const newData = [...data];
                                    newData[index].dateFin = e.target.value;
                                    setData(newData);
                                  }}
                                />
                              ) : (
                                formatDateForDisplay(saison.dateFin)
                              )}
                            </td>
                            <td>
                              {saison.archived ? "Oui" : "Non"}
                            </td>
                            <td>
                              <ul>
                                {saison.Users.map((user, userIndex) => (
                                  <li key={userIndex}>{user}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                            <ul>
        {saison.Oeuvres.map((oeuvreId, oeuvreIndex) => (
          <li key={oeuvreIndex}>{oeuvreMap[oeuvreId] || 'Nom inconnu'}</li>
        ))}
      </ul>
                            </td>
                            
                            <td>
                              <ul>
                                {saison.Condidats.map((Condidat, CondidatIndex) => (
                                  <li key={CondidatIndex}>{CondMap[Condidat] || 'Nom inconnu'}</li>
                                ))}
                              </ul>
                            </td>
                            
                            <td>
                              <ul>
                                {saison.Repetitions.map((Repetition, RepetitionIndex) => (
                                  <li key={RepetitionIndex}>{Repetition}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {saison.Concerts.map((Concert, ConcertIndex) => (
                                  <li key={ConcertIndex}>{Concert}</li>
                                ))}
                              </ul>
                            </td>
                             
<td>
                              <ul>
                                {saison.Compositeurs.map((Compositeur, CompositeurIndex) => (
                                  // <li key={CompositeurIndex}>{Compositeur}</li>
                                  <li key={CompositeurIndex}>{CompMap[Compositeur] || 'Nom inconnu'}</li>
                                ))}
                              </ul>
                            </td>
                            <td>
                              <ul>
                                {saison.Arrangeurs.map((Arrangeur, ArrangeurIndex) => (
                                  <li key={ArrangeurIndex}>{ArrMap[Arrangeur]|| 'Nom inconnu'}</li>
                                ))}
                              </ul>
                            </td>
                            
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {selectingChefs && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSelectingChefs(false)}>&times;</span>
            <h2>Sélectionner les chefs de pupitres</h2>
            <div>
            <select value={pupitreSelection} onChange={(e) => {
        const selectedPupitre = e.target.value;
        setPupitreSelection(selectedPupitre);
        // Appeler la fonction pour filtrer les utilisateurs en fonction du pupitre sélectionné
        handlePupitreSelection(selectedPupitre);
      }}>
                <option value="">Sélectionner le pupitre</option>
                <option value="Soprano">Soprano</option>
                <option value="Alto">Alto</option>
                <option value="Tenor">Tenor</option>
                <option value="Basse">Basse</option>
              </select>
              <select value={chefPupitre1} onChange={(e) => setChefPupitre1(e.target.value)}>
  <option value="">Sélectionner chef de pupitre 1</option>
  {choristes.map(user => (  // Utiliser la liste filtrée choristes au lieu de users
    <option key={user._id} value={user._id}>{user.nom} {user.prenom}</option>
  ))}
</select>
<select value={chefPupitre2} onChange={(e) => setChefPupitre2(e.target.value)}>
  <option value="">Sélectionner chef de pupitre 2</option>
  {choristes.map(user => (  // Utiliser la liste filtrée choristes au lieu de users
    <option key={user._id} value={user._id}>{user.nom} {user.prenom}</option>
  ))}
</select>

              <div>
                <button onClick={designateChefs}>Valider</button>
                <button onClick={handleCloseModal}>Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Saison;
