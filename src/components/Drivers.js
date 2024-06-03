import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag } from '../helpers';
import Breadcrumbs from './Breadcrumbs';
import SearchBar from './SearchBar';
import Table from 'react-bootstrap/Table';


const Drivers = (props) => {
   const [drivers, setDrivers] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getDrivers();
   }, []);

   const getDrivers = async () => {
      try {
         const url = "http://ergast.com/api/f1/2013/driverStandings.json";
         const res = await axios.get(url);
         const resDrivers = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
         setDrivers(resDrivers);
         setIsLoading(false);
      } catch (error) {
         console.error("Error", error);
      }
   };

   const filteredDrivers = drivers.filter(driver =>
      driver.Driver.givenName.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
      driver.Driver.familyName.toLowerCase().includes(searchTerm.trim().toLocaleLowerCase())
   );

   const crumbs = [
      { path: "/", label: "F1" },
      { path: "/drivers", label: "Drivers" }
   ];

   const handleShowDriverDetails = (id) => {
      const link = `/DriverDetails/${id}`;
      navigate(link)
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <div className='component-container-column'>
            <div className='header-wrapper'>
               <h1>Drivers Championship</h1>
               <SearchBar
                  type='text'
                  placeholder='Search drivers...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
            <section>
               <Table striped>
                  <thead>
                     <tr>
                        <th colSpan='5'>Drivers Championship Standings - 2013</th>
                     </tr>
                  </thead>
                  <tbody>
                     {filteredDrivers.map(driver =>
                        <tr key={driver.Driver.driverId}>
                           <td>{driver.position}</td>
                           <td
                              onClick={() => handleShowDriverDetails(driver.Driver.driverId)}
                              style={{ cursor: "pointer" }}
                           >
                              <Flag country={showFlag(props.flagsRes, driver.Driver.nationality)} />
                              {driver.Driver.givenName} {driver.Driver.familyName}
                           </td>
                           <td>{driver.Constructors[0].name}</td>
                           <td>{driver.points}</td>
                           <td>{driver.Driver.nationality}</td>
                        </tr>
                     )}
                  </tbody>
               </Table >
            </section>
         </div>
      </>
   );
};

export default Drivers;