import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from "./Loader";

const Drivers = () => {

   const [drivers, setDrivers] = useState({});
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
      const link = `/driverDeatils/${id}`;
      navigate(link)
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <h1>Drivers Championship</h1>
         <table>
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
                        {driver.Driver.givenName} {driver.Driver.familyName}
                     </td>
                     <td>{driver.Constructors[0].name}</td>
                     <td>{driver.points}</td>
                  </tr>
               )}
            </tbody>
         </table>
      </>
   );
};

export default Drivers;