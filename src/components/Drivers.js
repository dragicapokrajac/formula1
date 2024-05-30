import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag } from '../helpers';


const Drivers = (props) => {
   const [drivers, setDrivers] = useState([]);
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

   const handleShowDriverDetails = (id) => {
      const link = `/driverDetails/${id}`;
      navigate(link)
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <div className='component-container-column'>
         <h1>Drivers Championship</h1>
         <section>
            <table className='table-v100'>
               <thead>
                  <tr>
                     <th colSpan='4'>Drivers Championship Standings - 2013</th>
                  </tr>
               </thead>
               <tbody>
                  {drivers.map(driver =>
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
            </table>
         </section>
      </div>
   );
};

export default Drivers;