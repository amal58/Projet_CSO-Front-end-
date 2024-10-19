import React, { useState } from "react";
import './Formcondidat.css';
import { FaPhone, FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { HiIdentification } from "react-icons/hi2";
import { GiMusicalNotes } from "react-icons/gi";
import swal from 'sweetalert';



<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>;

export default function Fromcondidat() {
   const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [nomJeuneFille, setNomJeuneFille] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [nationalite, setNationalite] = useState('');
  const [taille, setTaille] = useState('');
  const [telephone, setTelephone] = useState('');
  const [cin, setCin] = useState('');
  const [situationProfessionnelle, setSituationProfessionnelle] = useState('');
  const [connaissancesMusicales, setConnaissancesMusicales] = useState(false);
  const [descriptionConnaissances, setDescriptionConnaissances] = useState('');
  const [parraine, setParraine] = useState(false);
  const [nomParrain, setNomParrain] = useState('');
  const [actifDansAutreChoeur, setActifDansAutreChoeur] = useState(false);
  const [nomAutreChoeur, setNomAutreChoeur] = useState('');
  const [motivationAmateur, setMotivationAmateur] = useState('');

  const handleSubmit = async (e) => {
    console.log("verif")
    e.preventDefault();

         try {
      const response = await fetch('http://localhost:3000/api/Condidat/SaveCondidats', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email,
          nomJeuneFille,
          sexe,
          dateNaissance,
          nationalite,
          taille,
          telephone,
          cin,
          situationProfessionnelle,
          connaissancesMusicales,
          descriptionConnaissances,
          parraine,
          nomParrain,
          actifDansAutreChoeur,
          nomAutreChoeur,
          motivationAmateur })
      });

      const result = await response.json();
      if (result) {
         setEmail('');
        setNomJeuneFille('');
        setSexe('');
        setDateNaissance('');
        setNationalite('');
        setTaille('');
        setTelephone('');
        setCin('');
        setSituationProfessionnelle('');
        setConnaissancesMusicales('');
        setDescriptionConnaissances('');
        setParraine('');
        setNomParrain('');
        setActifDansAutreChoeur('');
        setNomAutreChoeur('');
        setMotivationAmateur('');
        swal({
            title: "Candidature postulé avec succès",
            icon: "success",
            button: "Valider",
          });
      } else {
        
        swal("Erreur", "Une erreur s'est produite. Veuillez réessayer.", "error");
      }

     
      // Réinitialiser les champs du formulaire après avoir envoyé l'e-mail
      setNom('');
      // setPrenom('');
      setEmail('');
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
      // Afficher une alerte d'erreur
        alert('Une erreur s\'est produite');
    }
  };

  return (
<div className="verifmail-wrapper ">
  <div className="wrapper sidebar">
      <form onSubmit={handleSubmit}>
        <h1>Formulaire de condidature</h1>
        <div className="input-box">
          <input
            type="email"
            placeholder="Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            required
          />
          <IoIosMail className="con2" />
        </div>
        <div className="input-box">
          <label>Date de Naissance :</label>
          <input
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nom Jeune Fille"
            value={nomJeuneFille}
            onChange={(e) => setNomJeuneFille(e.target.value)}
            required
          />
          <FaUser className="con" />
        </div>
        <div className="input-box-radio">
          <label>Sexe :</label>
          
             <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Femme"
                    checked={sexe === "Femme"}
                    onChange={(e) => setSexe(e.target.value)}
                  />
                  Femme 
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Homme"
                    checked={sexe === "Homme"}
                    onChange={(e) => setSexe(e.target.value)}
                  />
                  Homme
                </label>
              </div>
          
        </div>
        
        <div className="input-box">
          <input
            type="text"
            placeholder="nationalite"
            value={nationalite}
            onChange={(e) => setNationalite(e.target.value)}
            required
          />
          <FaUser className="con" />
        </div> 
        <div className="input-box">
          <input
            type="text"
            placeholder="Taille"
            value={taille}
            onChange={(e) => setTaille(e.target.value)}
            pattern="[0-9]{3}"
            required
          />
          <FaUser className="con" />
        </div> 
        <div className="input-box">
          <input
            type="text"
            placeholder="telephone"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            pattern="[0-9]{8}"
            required
          />
          <FaPhone  className="con" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="cin"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            pattern="[0-9]{8}"
            required
          />
          <HiIdentification className="con" />

        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="situation Professionnelle"
            value={situationProfessionnelle}
            onChange={(e) => setSituationProfessionnelle(e.target.value)}
            required
          />
          <FaUser className="con" />
        </div>
        <div className="input-box-radio2">
          <label>connaissances Musicales :</label>
          
             <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={connaissancesMusicales === true}
                    onChange={(e) => setConnaissancesMusicales(true)}
                  />
                  Oui
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={connaissancesMusicales === false}
                    onChange={(e) => setConnaissancesMusicales(false)}
                  />
                  Non
                </label>
              </div>
          
        </div>
        <div className="input-box">
          {/* <label>Description des Connaissances :</label> */}
          <textarea
            placeholder="Description des Connaissances"
            value={descriptionConnaissances}
            onChange={(e) => setDescriptionConnaissances(e.target.value)}
            required
          />
        </div>
        <div className="input-box-radio2">
          <label>Parraine :</label>
          
             <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={parraine === true}
                    onChange={(e) => setParraine(true)}

                  />
                  Oui
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={parraine === false}
                    onChange={(e) => setParraine(false)}
                  />
                  Non
                </label>
              </div>
          
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="nom Parrain"
            value={nomParrain}
            onChange={(e) => setNomParrain(e.target.value)}
            required
          />
          <FaUser className="con" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="motivation Amateur"
            value={motivationAmateur}
            onChange={(e) => setMotivationAmateur(e.target.value)}
            required
          />
          <FaUser className="con" />
        </div>
         
        <div className="input-box-radio2">
          <label>Actif dans Autre choeur :</label>
          
             <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={actifDansAutreChoeur === true}
                    onChange={(e) => setActifDansAutreChoeur(true)}
                  />
                  Oui
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={actifDansAutreChoeur === false}
                    onChange={(e) => setActifDansAutreChoeur(false)}
                  />
                  Non
                </label>
              </div>
          
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="nom autre choeur"
            value={nomAutreChoeur}
            onChange={(e) => setNomAutreChoeur(e.target.value)}
            required
          />
          <GiMusicalNotes className="con" />
        </div>

        <button type="submit"> Postuler</button>
      </form>
    </div>
    </div>
    );
}