import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import Logo from "./img/rteam.jpg";
import LinkDriver from "./img/Kaciga.png";
import LinkTeams from "./img/Teams.png";
import LinkRaces from "./img/Races.png";



function App() {
   return (
      <>
         <Router>
            <nav>
               <ul>
                  <Link to="/"><img src={Logo} alt="Logo" style={{height:30, width:50}}></img></Link>
                  <li><NavLink to="/Drivers"><img src={LinkDriver} alt="Drivers" style={{height:30, width:50}}></img></NavLink></li>
                  <li><NavLink to="/Teams"><img src={LinkTeams} alt="Teams" style={{height:30, width:50}}></img></NavLink></li>
                  <li><NavLink to="/Races"><img src={LinkRaces} alt="Races" style={{height:30, width:50}}></img></NavLink></li>
               </ul>
            </nav>
            
            <Routes>
               <Route path="/" element={<div></div>} />
               <Route path="/drivers" element={<Drivers />} />
               <Route path="/driverDeatils/:id" element={<DriverDetails />} />
               <Route path="/teams" element={<Teams />} />
               <Route path="/teamDetails/:id" element={<TeamDetails />} />
               <Route path="/races" element={<Races />} />
            </Routes>
         </Router>
         
      </>
   );
}

export default App;
