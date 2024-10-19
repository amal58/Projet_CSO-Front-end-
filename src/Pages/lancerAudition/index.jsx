import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import SideMenu from "../../Components/SideMenu";
import AppHeader from "../../Components/AppHeader";
import './aud.css';

function CondidatConfirmedPage() {
    const [condidats, setCondidats] = useState([]);
  
    useEffect(() => {
      fetchCondidats();
    }, []);
   
    async function LancerAud() {
        try {
          const response = await fetch('http://localhost:3000/api/Condidat/lanceAudition');
    
          if (!response.ok) {
            throw new Error("Failed to lance audition");
          }
         const data = await response.json();
          setCondidats(data);     
          swal("Success", "Audition lancé avec succès", "success");
        } catch (error) {
          console.error("Erreur lors de lancement d'audition :", error);
          swal("Erreur", "Une erreur est survenue lors de lancement d'audition.", "error");
        }
      }

    const fetchCondidats = async () => {
      try {
        //const response = await fetch('http://localhost:3000/api/Condidat/lanceAudition');
        const response = await fetch('http://localhost:3000/api/Condidat/condidatConfirme');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCondidats(data);
      } catch (error) {
        console.error('Error fetching condidats:', error);
        swal('Error', 'Failed to fetch condidats', 'error');
      }
    };
  
    return (
<div className="App1">
<AppHeader />
<div className="SideMenuAndPageContent">
  <SideMenu />
  <div className="">
    <section className="py-1 bg-blueGray-50 pr-10 lg:pr-0">
      <div className="w-full xl:w-11/12 mb-12 xl:mb-0 px-4 mx-5 mt-12 mr-40 lg:mr-0">
        <h1 className="text-3xl my-2 custom-heading pos">
          <b>Liste des Emails vérifiées</b>          
        </h1>
        <button className="btn btn-primary btn_cl" onClick={LancerAud} >Lancer Audition</button>
        <br /><br/>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="w-full overflow-x-auto">
            <div className="w-full overflow-x-auto ctl">
              <table className="tablC">
                <thead>
                  <tr className="head">
                    <th>Nom</th>
                    <th>Prenom</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {condidats.map((condidat, index) => (
                    <tr key={index}>
                      <td>
                         {condidat.nom}
                        </td>
                        <td>
                         {condidat.prenom}
                        </td>
                        <td>
                         {condidat.email}
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
</div>
    );
  }
  
  export default CondidatConfirmedPage;