import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Drivers from "./components/Drivers";
import Teams from "./components/Teams";
import Races from "./components/Races";
import DriverDetails from "./components/DriverDetails";
import TeamDetails from "./components/TeamDetails";
import RaceResults from "./components/RaceResults";
import Navigation from "./components/Navigation";

function App() {
   const [flagsRes, setFlagsRes] = useState([]);
   useEffect(() => {
      getFlags();
   }, []);

   const getFlags = async () => {
      const url = 'https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json';
      const res = await axios.get(url);
      setFlagsRes(res.data)
   };
   return (
      <>
         <Router>
            <Navigation />
            <Routes>
            <Route path="/" element={<div></div>} />
               <Route path="/drivers" element={<Drivers flagsRes={flagsRes} />} />
               <Route path="/driverDeatils/:id" element={<DriverDetails />} />
               <Route path="/teams" element={<Teams flagsRes={flagsRes} /> } />
               <Route path="/teamDetails/:id" element={<TeamDetails flagsRes={flagsRes} />} />
               <Route path="/races" element={<Races flagsRes={flagsRes} />} />
               <Route path="/raceResults/:id" element={<RaceResults />} />
            </Routes>
         </Router>
      </>
   );
};

export default App;
