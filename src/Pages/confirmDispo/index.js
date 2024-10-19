import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom"; 
import axios from "axios";
import backgroundImage from "../../assets/da.jpg"; // Remplacez le chemin par le chemin de votre image

function ConfirmationDispo() {
    console.log("Home component rendered");
    const { concertId } = useParams(); 
    const { choristerId } = useParams();

    useEffect(() => {
        console.log("useEffect triggered");
        console.log(choristerId);
        console.log(concertId);
        const confirmEmail = async () => {
            try {
                const response = await fetch(`http://localhost:3000/concerts/confirmD/${concertId}/${choristerId}`);
                console.log(response);
                
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error); 
            }
        };

        confirmEmail();
    }, [concertId]); 

    function showAlert() {
        Swal.fire({
            title: "Votre Confirmation du disponibilité est valide",
            icon: "success",
            timer: 10000,
            timerProgressBar: true,
            showConfirmButton: false,
        });
    }

    React.useEffect(() => {
        showAlert();
    }, []);

    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`, // Utilisation de l'image de fond
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh', // Ajustez la hauteur en fonction de vos besoins
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            <h1></h1>
            {/* Votre contenu ici */}
        </div>
    );
}

export default ConfirmationDispo;
