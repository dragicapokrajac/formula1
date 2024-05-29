import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

const DriverDetails = () => {

   const params = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [driver, setDriver] = useState({});
   const [driverRaces, setDriverRaces] = useState([]);
   
   useEffect(() => {
      getDriver();
   }, []);
   
   const getDriver = async () => {
      try {
         const url1 = `http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`;
         
         const result = await axios.get(url1);
         const driverResult = result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
         setDriver(driverResult);
         console.log(driverResult);

         const url2 = `http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`;

          const result2 = await axios.get(url2);
          const raceResult = result2.data.MRData.RaceTable.Races;
          setDriverRaces(raceResult);
          console.log(raceResult);
          setIsLoading(false);
      } catch (error) {
         console.error("Error", error);
      }
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <h1>DriverDetails component</h1>

      <div>
         <div>{driver.Driver?.givenName}</div>
         <div>{driver.Driver?.familyName}</div>

         <table>
            <tbody>
               <tr>
                  <td><b>Country: </b></td>
                  <td>{driver.Driver.nationality}</td>
               </tr>
               <tr>
                  <td><b>Team: </b></td>
                  <td>{driver.Constructors[0].name}</td>
               </tr>
               <tr>
                  <td><b>Birth: </b></td>
                  <td>{driver.Driver.dateOfBirth}</td>
               </tr>
               <tr>
                  <td><b>Biography: </b></td>
                  <td><a href={driver.Driver.url}>link</a></td>
               </tr>
            </tbody>
         </table>

         <table>
            <thead>
               <tr>
                  <td colSpan='5'>Formula 1 2013 Results</td>
               </tr>
               <tr>
                  <th>Round</th>
                  <th>Grand Prix</th>
                  <th>Team</th>
                  <th>Grid</th>
                  <th>Race</th>
               </tr>
            </thead>
            <tbody>
            {driverRaces.map(d2 => 
                  <tr key={d2.Circuit.Location.lat}>
                     <td>{d2.round}</td>
                     <td>{d2.raceName}</td>
                     <td>{d2.Results[0].Constructor.name}</td>
                     <td>{d2.Results[0].grid}</td>
                     <td>{d2.Results[0].position}</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div>
      </>
   );
};

export default DriverDetails;