import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag } from '../helpers';
import { navigateToRaceResultsHandler } from '../helpers';
import Breadcrumbs from "./Breadcrumbs";
import SearchBar from './SearchBar';

const Races = (props) => {
   const [races, setRaces] = useState([]);
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
      setRaces(resData);
      setIsLoading(false);
   };

   const filteredDataRaces = races.filter(race => race.raceName.toLowerCase().includes(searchTerm.trim().toLowerCase()));

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/races', label: 'Races' }
   ];

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <div className='header-wrapper'>
            <h1>Races Calendar</h1>
            <SearchBar
               type='text'
               placeholder='Search races...'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>

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
               {filteredDataRaces.map(race =>
                  <tr key={race.Circuit.circuitId}>
                     <td>  {race.round}</td>
                     <td
                        onClick={() => navigateToRaceResultsHandler(race.round, navigate)}
                        style={{ cursor: "pointer" }}
                     >
                        <Flag country={showFlag(props.flagsRes, race.Circuit.Location.country)} />
                        {race.raceName}
                     </td>
                     <td>{race.Circuit.circuitName}</td>
                     <td>{race.date}</td>
                     <td>
                        <Flag country={showFlag(props.flagsRes, race.Results[0].Driver.nationality)} />
                        {race.Results[0].Driver.familyName}
                     </td>
                  </tr>
               )}
            </tbody>
         </table>

      </>

   );
};

export default Races;