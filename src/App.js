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
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./scss/styles.scss";
import Homepage from "./components/Homepage";

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

   const showFlag = (resFlags, checkParam) => {
      const flagArr = resFlags.filter(x =>
         x.nationality === checkParam || x.en_short_name === checkParam
      );
      if (flagArr.length) {
         return flagArr[0].alpha_2_code;
      } else if (checkParam === 'British' || checkParam === 'UK') {
         return 'GB';
      } else if (checkParam === 'Dutch') {
         return 'NL';
      } else if (checkParam === 'American') {
         return 'US';
      } else if (checkParam === 'Korea') {
         return 'KR';
      };
   };

   return (
      <>
         <Router>
            <Header />
            <Navigation />
            <Routes>
               <Route
                  path="/"
                  element={<Homepage />}
               />
               <Route
                  path="/drivers"
                  element={<Drivers flagsRes={flagsRes} showFlag={showFlag} />}
               />
               <Route
                  path="/driverDeatils/:id"
                  element={<DriverDetails flagsRes={flagsRes} showFlag={showFlag} />}
               />
               <Route
                  path="/teams"
                  element={<Teams flagsRes={flagsRes} showFlag={showFlag} />}
               />
               <Route
                  path="/teamDetails/:id"
                  element={<TeamDetails flagsRes={flagsRes} showFlag={showFlag} />}
               />
               <Route
                  path="/races"
                  element={<Races flagsRes={flagsRes} showFlag={showFlag} />}
               />
               <Route
                  path="/raceResults/:id"
                  element={<RaceResults flagsRes={flagsRes} showFlag={showFlag} />}
               />
            </Routes>
            <Footer />
         </Router>
      </>
   );
};

export default App;
