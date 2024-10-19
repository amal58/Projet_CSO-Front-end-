import { Space } from "antd";
import "./App.css";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./chefPupitreDashboard/Component/AppHeadere";

import SideMenu from "./chefPupitreDashboard/Component/SideMenuu";
import bgImg from './assets/home.jpg';
function DashPupitre() {
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
export default DashPupitre;
