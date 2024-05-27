import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";

function App() {
   return (
      <>
         <Router>
            <nav>
               <ul>
                  <li><Link to="/drivers">Drivers</Link></li>
                  <li><Link to="/teams">Teams</Link></li>
                  <li><Link to="/races">Races</Link></li>
               </ul>
            </nav>
            <Routes>
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
