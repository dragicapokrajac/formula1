import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag } from '../helpers';
import { navigateToRaceResultsHandler } from '../helpers';

const Races = (props) => {
   const [dataRaces, setDataRaces] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
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

   const filteredDataRaces = dataRaces.filter(dataRace => {
      const fullName = `${dataRace.raceName} ${dataRace.Circuit.circuitName} ${dataRace.date}${dataRace.Results[0].Driver.familyName}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
   });
   console.log(filteredDataRaces);

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <div> <input
            type="text"
            placeholder="Search for a drivers..."
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /> </div>
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
               {filteredDataRaces.map(dataRace =>
                  <tr key={dataRace.Circuit.circuitId}>
                     <td>  {dataRace.round}</td>
                     <td
                        onClick={() => navigateToRaceResultsHandler(dataRace.round, navigate)}
                        style={{ cursor: "pointer" }}
                     >
                        <Flag country={showFlag(props.flagsRes, dataRace.Circuit.Location.country)} />
                        {dataRace.raceName}
                     </td>
                     <td>{dataRace.Circuit.circuitName}</td>
                     <td>{dataRace.date}</td>
                     <td>
                        <Flag country={showFlag(props.flagsRes, dataRace.Results[0].Driver.nationality)} />
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