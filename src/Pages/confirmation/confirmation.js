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
function Confirmation() {
  console.log("Home component rendered");
  const { token } = useParams(); 

  useEffect(() => {
    console.log("useEffect triggered");
   
    const confirmEmail = async () => {
      try {
       
        const response = await axios.get(
          `http://localhost:3000/api/Condidat/confirmation/${token}`
        );
        console.log(response.data); 

      } catch (error) {
        console.error(error); 
      }
    };

   
    confirmEmail();
  }, [token]); 


  function showAlert() {
    Swal.fire({
      title: "Votre Confirmation est valide",
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

 
  React.useEffect(() => {
    showAlert();
  }, []);
  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default Confirmation;
