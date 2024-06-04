import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag, showColor, navigateHandler } from '../helpers';
import Breadcrumbs from "./Breadcrumbs";
import linkImg from '../img/icons/link_icon24px.png';

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

   const value = "position";

   const handleNavigateRaceResults = (id) => {
      const route = `/RaceResults/${id}`;
      navigateHandler(route, navigate);
   };

   if (isLoading) {
      return <Loader color='#2fa775' />;
   };

   return (
      <>
         <Breadcrumbs crumbs={crumbs} />
         <section className="component-container-row">
            <div className="card-section">
               <div className="card-info">
                  <img
                     src={require(`../img/teams/${teamDetails.Constructor.constructorId}.png`)}
                     className="img"
                  />
                  <Flag
                     className="img img-flag"
                     country={showFlag(props.flagsRes, teamDetails.Constructor.nationality)}
                  />
               </div>
               <div className="data-wrapper">
                  <div className="data-label">
                     <p>Team: </p>
                     <p>Country:</p>
                     <p>Position:</p>
                     <p>Points:</p>
                     <p>History:</p>
                  </div>
                  <div className="data">
                     <p>{teamDetails.Constructor.name}</p>
                     <p>{teamDetails.Constructor.nationality}</p>
                     <p>{teamDetails.position}</p>
                     <p>{teamDetails.points}</p>
                     <p>
                        <a
                           href={teamDetails.Constructor.url} target="_blank">
                           <img src={linkImg} />
                        </a>
                     </p>
                  </div>
               </div>
            </div>

            <div className="table-section-w80">
               <table className="table-teams">
                  <thead>
                     <tr>
                        <th
                           colSpan='5'
                           className="table-header"
                        >Formula 1 2013 Results</th>
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
                     {teamResults.map(result =>
                        <tr key={result.round}>
                           <td>{result.round}</td>
                           <td
                              onClick={() => handleNavigateRaceResults(result.round)}
                              className="link-td"
                           >
                              <div className="td-container">
                                 <Flag country={showFlag(props.flagsRes, result.Circuit.Location.country)} />
                                 <span>{result.raceName}</span>
                              </div>
                           </td>
                           <td style={{ backgroundColor: showColor(result.Results[0].position, value) }}>
                              {result.Results[0].position}
                           </td>
                           <td style={{
                              backgroundColor: showColor(result.Results[1].position, value),
                           }}>
                              {result.Results[1].position}
                           </td>
                           <td>{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </section>
      </>
   );
};

export default TeamDetails;


