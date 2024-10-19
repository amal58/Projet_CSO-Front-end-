import React, { useEffect, useState } from "react";
import axios from 'axios';
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../Component/AppHeadere";
import { TextField, InputAdornment, IconButton, Paper, Typography, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useParams } from "react-router-dom";

function Prof() {
  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const [presentConcerts, setPresentConcerts] = useState([]);
  const [absenceConcert, setAbsence] = useState([]);
  useEffect(() => {
    getUserDetails(id);
    getPresentConcerts(id)
    getAbsenceConcerts(id)
  }, [id]);

  async function getUserDetails(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/api/utilisateur/profil/${JSON.parse(localStorage.getItem('user'))._id}`);
      setUserDetails(response.data.profil);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'utilisateur :", error);
    }
  }
  async function getPresentConcerts(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/concerts/concerts-present/${JSON.parse(localStorage.getItem('user'))._id}`);
      setPresentConcerts(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des concerts présents :", error);
    }
  }

  async function getAbsenceConcerts(userId) {
    try {
      const response = await axios.get(`http://localhost:3000/concerts/concerts-absent/${JSON.parse(localStorage.getItem('user'))._id}`);
      setAbsence(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des concerts présents :", error);
    }
  }
  return (
    <div className="App1">
     <AppHeader/>
      <div className="SideMenuAndPageContent">
       
        <div>
          <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
            <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
              <h1 className="text-3xl my-2">
                <br />
                &nbsp;&nbsp; <b>Détailles</b>
              </h1>
              <br />

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="lg:flex items-center">
                    <div className="relative w-full px-4 max-w-full flex">
                      <div className="flex gap-x-3 rounded-tr-xl rounded-br-xl  border border-gray-100 p-2  item-center">
                        &nbsp;&nbsp;{" "}
                        <TextField
                          label="Rechercher"
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

                <div className="w-full" style={{ alignItems:'center', alignSelf:'center', marginLeft:'50px',marginRight:"50px"}}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {userDetails && (
                        <Paper className="user-card" elevation={3} style={{width:"500px",height:"500px", marginBottom:"5px", alignItems:'center'}}>
                          <Typography variant="h6" style={{marginLeft:"20px", marginTop:'20px'}}><b>Choriste:</b> {`${userDetails.nom} ${userDetails.prenom}`}</Typography>
                          <Typography variant="body1" style={{marginLeft:"20px"}}>Tessiture Vocale:<b style={{color:'blue'}}> {`${userDetails.tessitureVocale} `}</b></Typography>
     
                          <Typography variant="body1" style={{marginLeft:"20px"}}>Email:<b style={{color:'blue'}}> {`${userDetails.email} `}</b></Typography>
                             <Typography variant="body1" style={{marginLeft:"20px"}}>Nombre d'absence aux répetitions:<b style={{color:'blue'}}> {`${userDetails.nombreAbsenceRep} `}</b></Typography>
                          <Typography variant="body1" style={{marginLeft:"20px"}}>Nombre de presence aux répetitions:<b style={{color:'blue'}}> {`${userDetails.nb_prensenceRep} `}</b></Typography>
                          <Typography variant="body1" style={{marginLeft:"20px"}}>Nombre d'absence aux concerts:<b style={{color:'blue'}}> {`${userDetails.nombreAbsenceConcert} `}</b></Typography>
                          <Typography variant="body1" style={{marginLeft:"20px"}}>Nombre de presence aux concerts:<b style={{color:'blue'}}> {`${userDetails.nb_prensenceConcert} `}</b></Typography>
                          <Typography variant="body1" style={{marginLeft:"20px"}}><u>Presences aux répetitions:</u><b style={{color:'blue'}}> </b></Typography>
                          {userDetails.absence.map((absence) => (
                            <Typography key={absence._id} variant="body2" style={{marginLeft:"20px"}}>
                               {absence.dates_absence &&(<div> <ul><li>Présence: <span style={{ color: absence.Presence ? "green" : "red" }}>{absence.Presence ? "Present" : "Absent"}</span></li></ul></div>)}
                             {absence.dates_absence &&(<div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dates d'absence: <span style={{ color: absence.Presence }}>{absence.dates_absence.substring(0, 10)}</span></div>)}
                             {absence.dates_absence &&( <div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <b>Répetition Date et lieu: </b><span style={{ color: absence.Presence }}>{absence.repetitions.date} ,{absence.repetitions.lieu} </span>
                              ; <b>Saison: </b><span style={{ color: absence.Presence }}><b style={{color:'blue'}}>{absence.repetitions.saisonActuel}</b>  </span>
                              </div>)}
                            </Typography>
                          ))}
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className="user-card" elevation={3} style={{width:"500px",height:"500px", marginBottom:"5px", alignItems:'center' ,marginTop:'15px'}}>
                       
                      {presentConcerts.map((concert) => (
                          <div key={concert._id}>
                          <Typography variant="body1" style={{marginLeft:"20px"}}><b>Liste des concerts auxquels il Present:</b></Typography>
                          
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Titre: {concert.titre}</Typography>
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Oeuvre : {concert?.oeuvre?.titre}</Typography>
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Date: {new Date(concert.date).toLocaleDateString()}</Typography>
                            <Typography variant="body1" style={{marginLeft:"20px"}}>
  Heure début: {new Date(concert.heuredébut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'UTC'})}
</Typography>
<Typography variant="body1" style={{marginLeft:"20px"}}>
  Heure Fin: {new Date(concert.heurefin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'UTC'})}
</Typography>

                            {/* Ajoutez d'autres détails du concert si nécessaire */}
                          </div>
                          
                      
                      ))}
                      {absenceConcert.map((concert) => (
                           <div key={concert._id}>
                          <Typography variant="body1" style={{marginLeft:"20px"}}><b>Liste des concerts auxquels il Absent:</b></Typography>
                          
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Titre: {concert.titre}</Typography>
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Oeuvre : { concert?.oeuvre}</Typography>
   
                            <Typography variant="body1" style={{marginLeft:"20px"}}>Date: {new Date(concert.date).toLocaleDateString()}</Typography>
                            <Typography variant="body1" style={{marginLeft:"20px"}}>
  Heure début: {new Date(concert.heuredébut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'UTC'})}
</Typography>
<Typography variant="body1" style={{marginLeft:"20px"}}>
  Heure Fin: {new Date(concert.heurefin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false, timeZone: 'UTC'})}
</Typography>

                           
                          </div>
                      
                      ))}
                        </Paper>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Prof;
