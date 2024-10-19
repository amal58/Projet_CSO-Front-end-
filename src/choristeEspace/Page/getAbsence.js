import React, { useEffect, useState } from "react";
import SideMenu from "../Component/SideMenuu";
import AppHeader from "../Component/AppHeadere";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./index.css";

function GetAbsnceConcert() {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user")._id;
    // Effectuer un appel à l'API pour récupérer les absences
    fetchAbsences(userId);
  }, []);

  const fetchAbsences = async (userId) => {
    try {
      const response = await fetch(
        ` http://localhost:3000/api/absences/getabsenceschoriste/${JSON.parse(localStorage.getItem('user'))._id}`
      );
      const data = await response.json();

      // Filtrer les absences pour ne garder que celles qui ont un concert non vide
      const absencesWithConcert = data.filter(
        (absence) =>
          absence.concert && Object.keys(absence.concert).length !== 0
      );

      setAbsences(absencesWithConcert);
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
                &nbsp;&nbsp; <b>Absence des Concerts</b>
              </h1>
              <br />

              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="w-full overflow-x-auto">
                  <table className="tablC" width="1000px">
                    <thead>
                      <tr className="head">
                        <th>Raison</th>
                        <th>Les dates</th>
                        <th>Concert</th>
                      </tr>
                    </thead>
                    {absences.length!=0 &&(
                    <tbody>
                      {absences.map((absence) => (
                        <tr key={absence._id}>
                          <td>{absence.raison_absence}</td>
                          {/* hathi 9bal w hathi ili t7tha */}
                          {/* <td>{absence.dates_absence.join(", ")}</td>*/}

                          <td>
                            {absence.dates_absences
                              .map((date) =>
                                new Date(date).toLocaleDateString()
                              )
                              .join(", ")}
                          </td>
                          <td>
                            {absence.concert &&
                              Object.keys(absence.concert).length !== 0 && (
                                <>
                                  {absence.concert.lieu} -{" "}
                                  {/* hathi ili kant w hathi ili tawa */}
                                  {/* {absence.concert.date}*/}
                                  <td>
                                    {new Date(
                                      absence.concert.date
                                    ).toLocaleDateString()}
                                  </td>
                                </>
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    )}
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

export default GetAbsnceConcert;