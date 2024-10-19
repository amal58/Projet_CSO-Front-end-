import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./choristeEspace/Component/AppHeadere";

import SideMenu from "./choristeEspace/Component/SideMenuu/index";
import bgImg from './assets/home.jpg';
function DashChoriste() {
  return (
    <div className="ommm">
    <div className="App1">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        
        
 

      </div>
     
    </div>
    </div>
  );
}
export default DashChoriste;
