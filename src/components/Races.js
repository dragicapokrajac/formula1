import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import Flag from 'react-flagkit';
=======
>>>>>>> e5c507e9d169e1ee352b8b0c8583d32750276c4b


const Races = (props) => {
   const [dataRaces, setDataRaces] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getRaces();
   }, []);

   const getRaces = async () => {
      const url = "http://ergast.com/api/f1/2013/results/1.json";
      const response = await axios.get(url);
      const resData = response.data.MRData.RaceTable.Races;
      setDataRaces(resData);
      setIsLoading(false);
   };

   const handleRaceResults = (id) => {
      const link = `/raceResults/${id}`;
      navigate(link);
   };

   if (isLoading) {
      return <Loader />
   };



   return (
      <>
         <h1>Races Calendar</h1>
         <table>
            <thead>
               <tr>
                  <th>Round</th>
                  <th>Grand Prix</th>
                  <th>Circuit</th>
                  <th>Date</th>
                  <th>Winner</th>
               </tr>
            </thead>
            <tbody>
               {dataRaces.map(dataRace =>
                  <tr key={dataRace.Circuit.circuitId}>
<<<<<<< HEAD
                     <td>  {dataRace.round}</td>
                     <td
                        onClick={() => handleRaceResults(dataRace.round)}
                        style={{ cursor: "pointer" }}

                     >
                        {props.flagsRes.map(nation => {
                           if (nation.en_short_name === dataRace.Circuit.Location.country) {
                              return <Flag key={nation.alpha_2_code} country={nation.alpha_2_code} />;
                           } else {
                              return null;
                           }
                        })}
=======
                     <td>{dataRace.round}</td>
                     <td
                        onClick={() => handleRaceResults(dataRace.round)}
                        style={{ cursor: "pointer" }}
                     >
>>>>>>> e5c507e9d169e1ee352b8b0c8583d32750276c4b
                        {dataRace.raceName}
                     </td>
                     <td>{dataRace.Circuit.circuitName}</td>
                     <td>{dataRace.date}</td>
                     <td>

                        {props.flagsRes.map(nation =>
                           nation.nationality === dataRace.Results[0].Driver.nationality && <Flag country={nation.alpha_2_code} />
                        )}

                        {dataRace.Results[0].Driver.familyName}
                     </td>
                  </tr>
               )}
            </tbody>
         </table>
      </>
   );
};

export default Races;