
import React, { useState } from "react";
import './FormConfirmed.css';
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

import swal from 'sweetalert';


<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>;

export default function Confirmedmail() {
   const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState ('');
  const [email, setEmail] = useState('');
  const [successPopup, setSuccessPopup] = useState(false); 



  return (
  // <div className="wrapper">
  //   <form action="">
  //     <h1>Login</h1>
  //     <div className="input-box">
  //       <input type="text" placeholder="Nom" required/>
  //       <FaUser className="con" />
  //     </div>
  //     <div className="input-box">
  //       <input type="text" placeholder="Prenom" required/>
  //       <FaUser className="con" />
  //     </div>
  //     <div className="input-box">
  //       <input type="text" placeholder="Mail" required/>
  //       <IoIosMail className="con2" />

  //     </div>
  //     <button type="submit">Verifier Mail</button>
  //   </form>
  // </div>
  <div className="verifmail-wrapper">
  <div className="wrapper">
      <form >
        <h1>Email confirmé avec success</h1>
        
       
       <h4>Votre email est bien verifié on vous envoie un autre email lors de lancement d'audition</h4>
      </form>
    </div>
    </div>
    );
}