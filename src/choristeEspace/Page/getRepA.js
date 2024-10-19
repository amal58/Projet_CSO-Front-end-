import React, { useEffect, useState } from "react";
import SideMenu from "../Component/SideMenuu";
import AppHeader from "../Component/AppHeadere";
import "./index.css";

function GetAbsenceRep() {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      fetchAbsences(user._id);
    }
  }, []);

  const fetchAbsences = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/absences/getabsenceschoriste/${userId}`
      );
      const data = await response.json();
      const absencesWithRepetition = data.filter(
        (absence) => absence.repetitions !== null
      );
      setAbsences(absencesWithRepetition);
    } catch (error) {
      console.error("Erreur lors de la récupération des absences :", error);
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

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="w-full overflow-x-auto">
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                        <th>Raison d'absence</th>
                        <th>Les dates d'absences</th>
                        <th>Répétition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {absences.map((absence) => (
                        absence.dates_absences.length !== 0 && (
                          <tr key={absence._id}>
                            <td>{absence.raison_absence}</td>
                            <td>
                              {absence.dates_absences
                                .map((date) =>
                                  new Date(date).toLocaleDateString()
                                )
                                .join(", ")}
                            </td>
                            <td>
                              {absence.repetitions.lieu} -{" "}
                              {new Date(absence.repetitions.date).toLocaleDateString()}
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default GetAbsenceRep;
