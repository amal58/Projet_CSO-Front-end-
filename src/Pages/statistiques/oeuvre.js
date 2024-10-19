import React, { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import AppHeader from "../../Components/AppHeader";
import SideMenu from "../../Components/SideMenu";
import "./ConcertStatistics.css";

const OeuvreStat = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Oeuv/concert/stat/oeuvre"); // Assurez-vous d'utiliser l'URL correcte
        setStatistics(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques de concert par oeuvre :", error);
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
          <h2>le nombre de fois qu'une oeuvre a été chantée</h2>
          <ResponsiveContainer width="100%" height={600}>
            <BarChart
              data={statistics}
              margin={{ top: 60, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="titre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6DC5D1" name="Nombre de fois l'oeuvre a été chantée" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OeuvreStat;
