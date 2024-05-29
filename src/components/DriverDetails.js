import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";

const DriverDetails = (props) => {
   const params = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [driver, setDriver] = useState({});
   const [driverRaces, setDriverRaces] = useState([]);

   useEffect(() => {
      getDriver();
   }, []);

   const getDriver = async () => {
      try {
         const result = await axios.get(`http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`);
         setDriver(result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);

         const result2 = await axios.get(`http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`);
         setDriverRaces(result2.data.MRData.RaceTable.Races);

         setIsLoading(false);
      } catch (error) {
         console.error("Error", error);
      };
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <section>
            <div>
               <img src='' alt="DRIVER IMG" />
               <Flag country={props.showFlag(props.flagsRes, driver.Driver.nationality)} />
               <p>{driver.Driver?.givenName}</p>
               <p>{driver.Driver?.familyName}</p>
            </div>
            <br />
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
         </section>
         <br />
         <section>
            <table>
               <thead>
                  <tr>
                     <th colSpan='5'>Formula 1 2013 Results</th>
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
                        <td>
                           <Flag country={props.showFlag(props.flagsRes, d2.Circuit.Location.country)} />
                           {d2.raceName}
                        </td>
                        <td>{d2.Results[0].Constructor.name}</td>
                        <td>{d2.Results[0].grid}</td>
                        <td>{d2.Results[0].position}</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </>
   );
};

export default DriverDetails;