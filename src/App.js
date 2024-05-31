import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Homepage from "./components/Homepage";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import Races from "./components/Races";
import RaceResults from "./components/RaceResults";
import Footer from "./components/Footer";

const App = () => {
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
            <Header />
            <main className="routes-container">
               <Routes>
                  <Route
                     path="/"
                     element={<Homepage />}
                  />
                  <Route
                     path="/drivers"
                     element={<Drivers flagsRes={flagsRes} />}
                  />
                  <Route
                     path="/driverDetails/:id"
                     element={<DriverDetails flagsRes={flagsRes} />}
                  />
                  <Route
                     path="/teams"
                     element={<Teams flagsRes={flagsRes} />}
                  />
                  <Route
                     path="/teamDetails/:id"
                     element={<TeamDetails flagsRes={flagsRes} />}
                  />
                  <Route
                     path="/races"
                     element={<Races flagsRes={flagsRes} />}
                  />
                  <Route
                     path="/raceResults/:id"
                     element={<RaceResults flagsRes={flagsRes} />}
                  />
               </Routes>
            </main>
            <Footer />
         </Router>
      </>
   );
};

export default App;