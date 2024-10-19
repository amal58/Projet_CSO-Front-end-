import React, { useEffect } from "react";
import bgImg from "../../assets/5.jpg";
import { useParams } from "react-router-dom"; // Importez useParams pour récupérer le token de l'URL
import axios from "axios"; // Importez axios pour effectuer des requêtes HTTP

export default function Home() {
  console.log("Home component rendered");
  const { token } = useParams(); // Récupérez le token de l'URL en utilisant useParams

  useEffect(() => {
    console.log("useEffect triggered");
    // Définissez une fonction asynchrone pour effectuer la requête GET vers l'API de confirmation
    const confirmEmail = async () => {
      try {
        // Effectuez la requête HTTP GET vers l'API de confirmation en utilisant axios
        const response = await axios.get(
          `http://localhost:3000/api/Condidat/confirmation/${token}`
        );
        console.log(response.data); // Affichez la réponse de l'API dans la console

        // Vous pouvez effectuer d'autres actions ici après la confirmation réussie
      } catch (error) {
        console.error(error); // Gérez les erreurs éventuelles
      }
    };

    // Appelez la fonction de confirmation lorsque le composant est monté
    confirmEmail();
  }, [token]); // Utilisez le token comme dépendance pour que useEffect soit déclenché à chaque changement du token

  return (
    <section>
      <div className="col-2">
        <img src={bgImg} alt="" />
      </div>
    </section>
  );
}
