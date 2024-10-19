import Dash from "./dash";
import Inventory from "./Pages/Inventory";
import LoginReg from "./login";
import AjoutAdu from "./Pages/audition";
import Home from "./Pages/home/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./inscription";
import Customers from "./Pages/Customers";
import ArchiveSaison from "./Pages/condidatSaison/archiveSaison";
import Confirmation from "./Pages/confirmation/confirmation";
import ChoristeSaison from "./Pages/choristeSaison/choristeSaison";
import DashPupitre from "./DashPupitre";
import Choristee from "./chefPupitreDashboard/Page/AbsenceConcert";
import PresenceRep from "./chefPupitreDashboard/Page/AbsenceRepetition";
import AbsenceRep from "./chefPupitreDashboard/Page/absenceRep";
import PresenceConcert from "./chefPupitreDashboard/Page/AbsenceConcertList";
import UserStatus from "./Pages/userStatus";
import UserActivité from "./Pages/userActivité";
import OneUser from "./Pages/userActivité/oneUser";
import IndiquerDispo from "./Pages/Indiquer";
import ConfirmationDispo from "./Pages/confirmDispo";
import InfirmerDispo from "./Pages/infirmeDispo";
import DashChoriste from "./dashChoriste";
import Prof from "./choristeEspace/Page/profill";
import ChoristeStatus from "./choristeEspace/Page/statusChoriste";
import Getrepetition from "./Pages/getRepetitioonChoriste/getRepetition";
import Repetetion from "./Pages/repetitionchoriste";
import ConcertStatistics from "./Pages/statistiques/concert";
import ChoicePage from "./Pages/statistiques/choix";
import AbsenceStatisticsChart from "./Pages/statistiques/repétition";
import OeuvreStat from "./Pages/statistiques/oeuvre";
import Absences3 from "./choristeEspace/Page/absence";
import GetAbsnceConcert from "./choristeEspace/Page/getAbsence";
import GetAbsenceRep from "./choristeEspace/Page/getRepA";
import Absences from "./choristeEspace/Page/absence2";
import GetPresences from "./chefPupitreDashboard/Page/presences/getPresence";
import GetPrsencesByProgramme from "./chefPupitreDashboard/Page/presences/getPresenceByProgramme";
import Absences2 from "./choristeEspace/Page/absences3";
import Saison from "./Pages/saison";
import Verifmail from "./verifEmeil";

import Confirmedmail from "./Pages/FormConfirm/FormConfirmed";
import CondidatConfirmedPage from "./Pages/lancerAudition";
import Fromcondidat from "./Pages/FormCondidature/FormCondidature";
import ConsultPlanningAuditions from "./Pages/3cplanning/ConsulterPlanning";
import PlanificationAuditions from "./Pages/lancerAudition/planningAudition";
import ConfirmationPage from "./choristeEspace/Page/tablerepetitions/ConfirmationPage";
import ConfirmationPageConcert from "./choristeEspace/Page/tableconcerts/ConfirmationPageConcert";
import RepetitionTable from "./choristeEspace/Page/tablerepetitions/RepetitionTable";
import ConcertTable from "./choristeEspace/Page/tableconcerts/ConcertTable";
import Nominations from "./Pages/Nominations/Nominations";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginReg />} />
      <Route exact path="/home/:token" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/getAbss" element={<GetAbsnceConcert />} />
      <Route path="/Dash" element={<Dash />} />
      <Route path="/absenc" element={<Absences2 />} />
      <Route path="/verif" element={<Verifmail />} />
      <Route path="/GetRep" element={<Getrepetition />} />
      <Route path="/saison" element={<Saison />} />
      <Route path="/Confirm" element={<Confirmedmail />} />
      <Route path="/plannifierAu" element={<PlanificationAuditions />} />
      <Route path="/lancerAud" element={<CondidatConfirmedPage />} />
      <Route path="/condidature" element={<Fromcondidat />} />
      <Route path="/consultePlanning" element={<ConsultPlanningAuditions />} /> 
      <Route path="/absenceget" element={<GetPresences />} />
      <Route path="/prog" element={<GetPrsencesByProgramme />} />
      <Route path="/abs2" element={<Absences />} />
      <Route path="/AbsR" element={<GetAbsenceRep />} />
      <Route path="/getAbs" element={<Absences3 />} />



      <Route
        path="/repetition/:repetitionId/confirmation"
        element={<ConfirmationPage />}
      />
      <Route
        path="/concert/:concertId/confirmation"
        element={<ConfirmationPageConcert />}
      />

<Route path="/Nominations" element={<Nominations />} />
 <Route
        path="/RepetitionsQR"
        element={<RepetitionTable></RepetitionTable>}
      />
      <Route path="/QRconcert" element={<ConcertTable></ConcertTable>} />
      <Route path="/statuut" element={<ChoristeStatus />} />
      <Route path="/DashP" element={<DashPupitre />} />
      <Route path="/choix" element={<ChoicePage />} />
      <Route path="/AjoutE" element={<AjoutAdu />} />
      <Route path="/AjoutRep" element={<Repetetion />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/statRep" element={<AbsenceStatisticsChart />} />
      <Route path="/oeuv" element={<OeuvreStat />} />
      <Route path="/Prof" element={<Prof />} />
      <Route path="/register" element={<Form />} />
      <Route path="/ArchiveSaison" element={<ArchiveSaison />} />
      <Route path="/activité" element={<UserActivité />} />
      <Route path="/Confirmation/:token" element={<Confirmation />} />
      <Route path="/choristeSaison" element={<ChoristeSaison />} />
      <Route path="/MarquerPresenceConcert" element={<Choristee />} />
      <Route path="/MarquerPresenceRep" element={<PresenceRep />} />
      <Route path="/absenceRep" element={<AbsenceRep />} />
      <Route path="/presenceConcert" element={<PresenceConcert />} />
      <Route path="/statusUsers" element={<UserStatus />} />
      <Route path="/user/:id" element={<OneUser />} />
      <Route path="/indiquerDispo" element={<IndiquerDispo />} />
      <Route path="/stat" element={<ConcertStatistics />} />
      <Route path="/dashChoriste" element={<DashChoriste />} />
      <Route path="/confirm/:concertId/:choristerId" element={<ConfirmationDispo />} />
      <Route path="/infirme/:concertId/:choristerId" element={<InfirmerDispo />} />
    </Routes>
  );
}
export default App;
