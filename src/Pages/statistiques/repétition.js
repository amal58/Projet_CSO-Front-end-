import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import "./ConcertStatistics.css"; // Ajoutez ce fichier pour le style
import "./ConcertStatistics.css"; // Assurez-vous d'avoir un fichier CSS pour le style

const AbsenceStatisticsChart = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/absences/statistique/stat"); // Endpoint à adapter
        const formattedData = response.data
          .filter(stat => stat.repetition !== null) // Filtrer les absences avec répétition non nulles
          .map(stat => ({
            ...stat,
            concertDateLieu: `${new Date(stat.date).toISOString().slice(0, 10).replace(/-/g, '/')} - ${stat.lieu}`,
          }));
        setStatistics(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques de concert :", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu />
        <div className="PageContent">
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={statistics}
              margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="concertDateLieu" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="nbPresence" fill="#6DC5D1" name="Présences" />
              <Bar dataKey="nbAbsence" fill="#DD761C" name="Absences" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AbsenceStatisticsChart;



