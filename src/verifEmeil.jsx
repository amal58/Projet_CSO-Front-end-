import React, { useState } from "react";
import styles from './verifEmeil.module.css';
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import swal from 'sweetalert';
export default function Verifmail() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [successPopup, setSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("verif");

    try {
      const response = await fetch('http://localhost:3000/api/Condidat/VerifMail2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nom, prenom, email })
      });
      const result = await response.json();
      if (response.ok) {
        setNom('');
        setPrenom('');
        setEmail('');
        swal({
            title: "Email envoyer avec succès",
            icon: "success",
            button: "Valider",
          });
      } else {
        if (result.error.includes('duplicate key error')) {
          swal("Erreur", "Cet email existe déjà.", "error");
          setNom('');
          setPrenom('');
          setEmail('');
        } else {
          swal("Erreur", result.error, "error");
          setNom('');
          setPrenom('');
          setEmail('');
        }
      }
    } catch (error) {
      console.error('Une erreur s\'est produite :', error);
    }
  };

  return (
    <div className={styles.verifmailWrapper}>
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <h1>Verifier votre email</h1>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
            <FaUser className={styles.con} />
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              placeholder="Prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
            <FaUser className={styles.con} />
          </div>
          <div className={styles.inputBox}>
            <input
              type="email"
              placeholder="Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <IoIosMail className={styles.con2} />
          </div>
          <button type="submit">Verifier Mail</button>
        </form>
      </div>
    </div>
  );
}
