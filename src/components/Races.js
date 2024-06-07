import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag, navigateHandler } from '../helpers';
import Breadcrumbs from "./Breadcrumbs";
import SearchBar from './SearchBar';
import Header from "./Header";

const Races = (props) => {
   const [races, setRaces] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getRaces();
   }, []);

   const getRaces = async () => {
      const url = "https://ergast.com/api/f1/2013/results/1.json";
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

   const handleNavigateRaceResults = (id) => {
      const route = `/RaceResults/${id}`;
      navigateHandler(route, navigate);
   };

   if (isLoading) {
      return <Loader color='#36b061' />
   };

   return (
      <>
         <Header />
         <Breadcrumbs crumbs={crumbs} color="#36b061" />
         <section className='component-container-column'>
            <h1>Races Calendar</h1>
            <SearchBar
               type='text'
               placeholder='Search races...'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className='table-races'>
               <thead>
                  <tr>
                     <th>Round</th>
                     <th>&nbsp;</th>
                     <th>Grand Prix</th>
                     <th>Circuit</th>
                     <th>Date</th>
                     <th>&nbsp;</th>
                     <th>Winner</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredDataRaces.map(race =>
                     <tr key={race.Circuit.circuitId}>
                        <td>  {race.round}</td>
                        <td>
                           <Flag country={showFlag(props.flagsRes, race.Circuit.Location.country)} />
                        </td>
                        <td
                           onClick={() => handleNavigateRaceResults(race.round)}
                           className="link-td"
                        >
                           {/* <div className="td-container"> */}
                           {/* <Flag country={showFlag(props.flagsRes, race.Circuit.Location.country)} /> */}
                           {race.raceName}
                           {/* </div> */}
                        </td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td>
                           <Flag country={showFlag(props.flagsRes, race.Results[0].Driver.nationality)} />
                        </td>
                        <td>
                           {/* <div className="td-container"> */}
                           {/* <Flag country={showFlag(props.flagsRes, race.Results[0].Driver.nationality)} /> */}
                           {race.Results[0].Driver.familyName}
                           {/* </div> */}
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </>
   );
};

export default Races;