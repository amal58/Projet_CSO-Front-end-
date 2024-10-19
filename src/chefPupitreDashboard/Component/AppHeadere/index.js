import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import ad from "../../../assets/Avatar-Profile-PNG-Image-File.png"

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);


  const navigate = useNavigate();
  const [user, setUser] = useState()
  const [token, setToken] = useState()
  useEffect(() => {
    if (localStorage.getItem('token')) {
        setUser(JSON.parse(localStorage.getItem('user')))
        setToken(JSON.parse(localStorage.getItem('token')))
    } 
}, [])
  

  return (
    <div className="AppHeader">
     
      <Typography.Title><b style={{color:'black' , fontSize:'30px'}} > &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;CSO( Chef pupitre Space)</b></Typography.Title>
      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;
      <p style={{color:"blueviolet"}}><b>{user?.nom} {user?.prenom}      </b></p>
     
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
     
        
      
    </div>
  );
}
export default AppHeader;
