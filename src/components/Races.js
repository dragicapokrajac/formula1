import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";


const Races = () => {
   const [dataRaces, setDataRaces] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
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
                     <td>{dataRace.round}</td>
                     <td>{dataRace.raceName}</td>
                     <td>{dataRace.Circuit.circuitName}</td>
                     <td>{dataRace.date}</td>
                     <td>{dataRace.Results[0].Driver.familyName}</td>
                  </tr>
               )}
            </tbody>
         </table>
      </>
   );
};

export default Races;