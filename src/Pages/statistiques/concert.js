import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import "./ConcertStatistics.css"; // Ajoutez ce fichier pour le style

const ConcertStatistics = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/concert/stat"); // Assurez-vous de remplacer par l'URL correcte de votre endpoint
        const formattedData = response.data.map(stat => ({
          ...stat,
          concertDateLieu: `${new Date(stat.concert.date).toISOString().slice(0, 10).replace(/-/g, '/')} - ${stat.concert.lieu}`,
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
              margin={{
                top: 60, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="concertDateLieu" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalPresence" fill="#6DC5D1" name="Présences" />
              <Bar dataKey="totalAbsence" fill="#DD761C" name="Absences" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ConcertStatistics;
