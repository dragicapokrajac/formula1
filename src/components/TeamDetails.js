import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag, navigateToRaceResultsHandler, showColor } from '../helpers';
import Breadcrumbs from "./Breadcrumbs";
import Table from 'react-bootstrap/Table';

const TeamDetails = (props) => {
   const params = useParams();
   const [teamDetails, setTeamDetails] = useState([]);
   const [teamResults, setTeamResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getTeamDetails();
   }, []);

   const getTeamDetails = async () => {
      const urlStandings = `http://ergast.com/api/f1/2013/constructors/${params.id}/constructorStandings.json`;
      const urlResults = `http://ergast.com/api/f1/2013/constructors/${params.id}/results.json`;

      const responseStandings = await axios.get(urlStandings);
      const responseResults = await axios.get(urlResults);

      setTeamDetails(responseStandings.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
      setTeamResults(responseResults.data.MRData.RaceTable.Races);

      setIsLoading(false);
   };

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/teams', label: 'Teams' },
      { path: `/teamDetails/${params.id}`, label: `${teamDetails.Constructor?.name}` }
   ];

   const ifParam = "position";

   if (isLoading) {
      return <Loader />;
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <section className="component-container-row">
            <div className="card-section">
               <div className="card-ifo">
                  <img src={require(`../img/teams/${teamDetails.Constructor.constructorId}.png`)}
                     style={{ width: '80px', height: 'auto' }}
                  />
                  <Flag country={showFlag(props.flagsRes, teamDetails.Constructor.nationality)} />
               </div>
               <div className="data-wrapper">
                  <div className="data-label">
                     <p>Team: {teamDetails.Constructor.name}</p>
                     <p>Country:{teamDetails.Constructor.nationality}</p>
                     <p>Position:{teamDetails.position}</p>
                     <p>Points:{teamDetails.points}</p>
                     <p><a href={teamDetails.Constructor.url} target="_blank">Details</a></p>
                  </div>
               </div>
            </div>

            <div className="table-section-w80">
               <table className="table-teams">
                  <thead>
                     <tr>
                        <th colSpan='5'>Formula 1 2013 Results</th>
                     </tr>
                     <tr>
                        <th>Round</th>
                        <th>Gran Prix</th>
                        <th>{teamResults[0].Results[0].Driver.familyName}</th>
                        <th>{teamResults[0].Results[1].Driver.familyName}</th>
                        <th>Points</th>
                     </tr>
                  </thead>
                  <tbody>
                     {teamResults.map((result =>
                        <tr key={result.round}>
                           <td>{result.round}</td>
                           <td
                              onClick={() => navigateToRaceResultsHandler(result.round, navigate)}
                              style={{ cursor: 'pointer' }}
                           >
                              <Flag country={showFlag(props.flagsRes, result.Circuit.Location.country)} />
                              &nbsp; {result.raceName}
                           </td>
                           <td style={{ backgroundColor: showColor(result.Results[0].position, ifParam) }}>
                              {result.Results[0].position}
                           </td>
                           <td style={{
                              backgroundColor: showColor(result.Results[1].position, ifParam),
                           }}>
                              {result.Results[1].position}
                           </td>
                           <td>{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
};

export default TeamDetails;


