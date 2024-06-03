import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from "react-flagkit";
import { showFlag, navigateToRaceResultsHandler, showColor } from '../helpers';
import linkImg from '../img/icons/link-black.png';
import Breadcrumbs from './Breadcrumbs';


const DriverDetails = (props) => {
   const params = useParams();
   const [isLoading, setIsLoading] = useState(true);
   const [driver, setDriver] = useState({});
   const [driverRaces, setDriverRaces] = useState([]);
   const navigate = useNavigate();

   useEffect(() => {
      getDriverDetails();
   }, []);

   const getDriverDetails = async () => {
      try {
         const result = await axios.get(`http://ergast.com/api/f1/2013/drivers/${params.id}/driverStandings.json`);
         const result2 = await axios.get(`http://ergast.com/api/f1/2013/drivers/${params.id}/results.json`);

         setDriver(result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]);
         setDriverRaces(result2.data.MRData.RaceTable.Races);

         setIsLoading(false);
      } catch (error) {
         console.error("Error", error);
      };
   };

   const crumbs = [
      { path: "/", label: "F1" },
      { path: "/drivers", label: "Drivers" },
      { path: `/driverDetails/${params.id}`, label: `${driver.Driver?.givenName} ${driver.Driver?.familyName}` }
   ];

   const ifParam = "position";

   if (isLoading) {
      return <Loader color='#ffc547' />
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <section className='component-container-row'>
            <div className="card-section">
               <div className="card-info">
                  <img
                     src={require(`../img/drivers/${driver.Driver.driverId}.jpg`)}
                     className="img"
                  />
                  <Flag className=" img img-flag"
                     country={showFlag(props.flagsRes, driver.Driver.nationality)}
                  />
                  <p>{driver.Driver.givenName} {driver.Driver.familyName}</p>
               </div>
               <div className="data-wrapper">
                  <div className="data-label">
                     <p>Country:</p>
                     <p>Team:</p>
                     <p>Birth:</p>
                     <p>Biography:</p>
                  </div>
                  <div className="data">
                     <p>{driver.Driver.nationality}</p>
                     <p>{driver.Constructors[0].name}</p>
                     <p>{driver.Driver.dateOfBirth}</p>
                     <p><a href={driver.Driver.url} target="_blank">
                        <img src={linkImg} className='link-icon' />
                     </a></p>
                  </div>
               </div>
            </div>

            <div className="table-section-w80">
               <table className="table-drivers">
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
                        <tr key={d2.round}>
                           <td>{d2.round}</td>
                           <td
                              onClick={() => navigateToRaceResultsHandler(d2.round, navigate)}
                              style={{ cursor: "pointer" }}
                           >
                              <Flag country={showFlag(props.flagsRes, d2.Circuit.Location.country)} />
                              {d2.raceName}
                           </td>
                           <td>{d2.Results[0].Constructor.name}</td>
                           <td>{d2.Results[0].grid}</td>
                           <td style={{ backgroundColor: showColor(d2.Results[0].position, ifParam) }}>
                              {d2.Results[0].position}
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
};

export default DriverDetails;