import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from "react-flagkit";
import { showFlag, showColor } from '../helpers';
import linkImg from '../img/icons/link-black.png';
import Breadcrumbs from "./Breadcrumbs";
import Table from 'react-bootstrap/Table';

const RaceResults = ({ flagsRes }) => {
   const [qualifyingResults, setQualifyingResults] = useState([]);
   const [raceResults, setRaceResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const params = useParams();

   useEffect(() => {
      getRaceResults();
   }, []);

   const getRaceResults = async () => {
      try {
         const resQualifying = await axios.get(`http://ergast.com/api/f1/2013/${params.id}/qualifying.json`);
         const resRaceResults = await axios.get(`http://ergast.com/api/f1/2013/${params.id}/results.json`);

         setQualifyingResults(resQualifying.data.MRData.RaceTable.Races[0]);
         setRaceResults(resRaceResults.data.MRData.RaceTable.Races[0].Results);

         setIsLoading(false);
      } catch (error) {
         console.error(error);
      };
   };

   let bestTime = [];

   const ifParam = "points";

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/races', label: 'Races' },
      { path: `/raceResults/${params.id}`, label: `${qualifyingResults.raceName}` }
   ];

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <section className='component-container-row'>
            <div className="card-section">
               <div className="card-info">
                  <Flag country={showFlag(flagsRes, qualifyingResults?.Circuit.Location.country)} />
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
                     <p><
                        a href={qualifyingResults.url} target="_blank">Details:
                        <img src={linkImg} className='link-icon' style={{ width: "2%", height: "auto" }} /></a>
                     </p>
                  </div>
               </div>
            </div>

            <div className="table-section-w80">
               <table className="table-w50">
                  <thead>
                     <tr>
                        <th colSpan='4'>Qualifying Results</th>
                     </tr>
                     <tr>
                        <th>Pos</th>
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
                              &nbsp; {qRes.Driver.familyName}
                           </td>
                           <td>{qRes.Constructor.name}</td>
                           <td>{bestTime = [qRes.Q1, qRes.Q2, qRes.Q3].sort()[0]}</td>
                        </tr>
                     )}
                  </tbody>
               </table>


               <table className="table-w50">
                  <thead>
                     <tr>
                        <th colSpan='5'>Race Results</th>
                     </tr>
                     <tr>
                        <th>Pos</th>
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
                              &nbsp;{result.Driver.familyName}
                           </td>
                           <td>{result.Constructor.name}</td>
                           <td>{result.Time?.time}</td>
                           <td style={{ backgroundColor: showColor(result.points, ifParam) }}>

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