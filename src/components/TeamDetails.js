import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag, navigateToRaceResultsHandler, showColor } from '../helpers';
import Breadcrumbs from "./Breadcrumbs";

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
         <section>
            <Breadcrumbs crumbs={crumbs} />
            <div>
               <img src={require(`../img/teams/${teamDetails.Constructor.constructorId}.png`)} style={{ width: '80px', height: 'auto' }} />
               <Flag country={showFlag(props.flagsRes, teamDetails.Constructor.nationality)} />
               <p>Team: {teamDetails.Constructor.name}</p>
               <p>Country:{teamDetails.Constructor.nationality}</p>
               <p>Position:{teamDetails.position}</p>
               <p>Points:{teamDetails.points}</p>
               <p><a href={teamDetails.Constructor.url} target="_blank">Details</a></p>
            </div>
         </section>
         <div>
            <h1>Formula 1 2013 Results</h1>
            <table>
               <thead>
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
                           {result.raceName}
                        </td>
                        <td style={{ backgroundColor: showColor(result.Results[0].position, ifParam) }}>
                           {parseInt(result.Results[0].position)}
                        </td>
                        <td style={{ backgroundColor: showColor(result.Results[1].position, ifParam) }}>
                           {parseInt(result.Results[1].position)}
                        </td>
                        <td>{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default TeamDetails;


