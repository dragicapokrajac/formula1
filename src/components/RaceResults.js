import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from "react-flagkit";
import { showFlag, showColor, navigateHandler } from '../helpers';
import linkImg from '../img/icons/link_icon.png';
import Breadcrumbs from "./Breadcrumbs";
import Header from "./Header";

const RaceResults = ({ flagsRes }) => {
   const [qualifyingResults, setQualifyingResults] = useState([]);
   const [raceResults, setRaceResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const params = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      getRaceResults();
   }, []);

   const getRaceResults = async () => {
      try {
         const resQualifying = await axios.get(`https://ergast.com/api/f1/2013/${params.id}/qualifying.json`);
         const resRaceResults = await axios.get(`https://ergast.com/api/f1/2013/${params.id}/results.json`);

         setQualifyingResults(resQualifying.data.MRData.RaceTable.Races[0]);
         setRaceResults(resRaceResults.data.MRData.RaceTable.Races[0].Results);

         setIsLoading(false);
      } catch (error) {
         console.error(error);
      };
   };

   let bestTime = [];

   const value = "points";

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/races', label: 'Races' },
      { path: `/raceResults/${params.id}`, label: `${qualifyingResults.raceName}` }
   ];

   const handleNavigateDriverDetails = (id) => {
      const route = `/DriverDetails/${id}`;
      navigateHandler(route, navigate);
   };

   const handleNavigateTeamDetails = (id) => {
      const route = `/TeamDetails/${id}`;
      navigateHandler(route, navigate);
   };

   if (isLoading) {
      return <Loader color='#36b061' />
   };

   return (
      <>
         <Header />
         <Breadcrumbs crumbs={crumbs} color="#36b061" />
         <section className='component-container-row'>
            <div className="card-section">
               <div className="card-info">
                  <Flag
                     className="img"
                     country={showFlag(flagsRes, qualifyingResults?.Circuit.Location.country)}
                  />
               </div>
               <div className="data-wrapper">
                  <div className="data-label">
                     <p>Country:</p>
                     <p>Location:</p>
                     <p>Date:</p>
                     <p>Full Report:</p>
                  </div>
                  <div className="data">
                     <p>{qualifyingResults.Circuit.Location.country}</p>
                     <p>{qualifyingResults.Circuit.Location.locality}</p>
                     <p>{qualifyingResults.date}</p>
                     <p>
                        <a
                           href={qualifyingResults.url}
                           target="_blank">
                           <img src={linkImg} className="link-icon" />
                        </a>
                     </p>
                  </div>
               </div>
            </div>

            <div className="table-section-w80">
               <table className="table-w50">
                  <thead>
                     <tr>
                        <th
                           colSpan='5' className="table-header"
                        >Qualifying Results</th>
                     </tr>
                     <tr>
                        <th>Pos</th>
                        <th>&nbsp;</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Best Time</th>
                     </tr>
                  </thead>
                  <tbody>
                     {qualifyingResults.QualifyingResults.map(qRes =>
                        <tr key={qRes.Driver.driverId}>
                           <td>{qRes.position}</td>
                           <td>
                              <Flag country={showFlag(flagsRes, qRes.Constructor.nationality)} />
                           </td>
                           <td
                              onClick={() => handleNavigateDriverDetails(qRes.Driver.driverId)}
                              className="link-td"
                           >
                              {qRes.Driver.familyName}
                           </td>
                           <td
                              onClick={() => handleNavigateTeamDetails(qRes.Constructor.constructorId)}
                              className="link-td"
                           >{qRes.Constructor.name}</td>
                           <td>{bestTime = [qRes.Q1, qRes.Q2, qRes.Q3].sort()[0]}</td>
                        </tr>
                     )}
                  </tbody>
               </table>

               <table className="table-w50">
                  <thead>
                     <tr>
                        <th
                           colSpan='6'
                           className="table-header">Race Results</th>
                     </tr>
                     <tr>
                        <th>Pos</th>
                        <th>&nbsp;</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Result</th>
                        <th>Points</th>
                     </tr>
                  </thead>
                  <tbody>
                     {raceResults.map(result =>
                        <tr key={result.Driver.driverId}>
                           <td>{result.position}</td>
                           <td>
                              <Flag country={showFlag(flagsRes, result.Driver.nationality)} />
                           </td>
                           <td
                              onClick={() => handleNavigateDriverDetails(result.Driver.driverId)}
                              className="link-td"
                           >
                              {result.Driver.familyName}
                           </td>
                           <td
                              onClick={() => handleNavigateTeamDetails(result.Constructor.constructorId)}
                              className="link-td"
                           >{result.Constructor.name}</td>
                           <td>{result.Time?.time}</td>
                           <td style={{ backgroundColor: showColor(result.points, value) }}>
                              {result.points}
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

export default RaceResults;