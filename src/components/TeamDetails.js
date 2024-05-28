import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const TeamDetails = () => {

   const params = useParams();
    const [teamDetails, setTeamDetails] = useState([]);
    const [teamResults, setTeamResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      getTeamDetails();
  }, []);


  const getTeamDetails = async () => {
   console.log(params);
   const urlStandings = `http://ergast.com/api/f1/2013/constructors/${params.id}/constructorStandings.json`;
   const urlResults = `http://ergast.com/api/f1/2013/constructors/${params.id}/results.json`;
   const responseStandings = await axios.get(urlStandings);
   const responseResults = await axios.get(urlResults);
   setTeamDetails(responseStandings.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]);
   setTeamResults (responseResults.data.MRData.RaceTable.Races);
   setIsLoading(false);
};
console.log(teamResults)

if (isLoading) {
   return <Loader />;
}

return (
   <>
   <div>
       <p>Team: {teamDetails.Constructor.name}</p>
       <p>Country:{teamDetails.Constructor.nationality}</p>
       <p>Position:{teamDetails.position}</p>
       <p>Points:{teamDetails.points}</p>
       <p><a href={teamDetails.Constructor.url} target="_blank">Details</a></p>
   </div>
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

          {teamResults.map((result) => (
            <tr key={result.round}>
              <td>{result.round}</td>
              <td>{result.raceName}</td>
              <td>{parseInt(result.Results[0].position)}</td>
              <td>{parseInt(result.Results[1].position)}</td>
              <td>{parseInt(result.Results[0].points) + parseInt(result.Results[1].points)}</td>
            </tr>
          ))}
            </tbody>
         </table>
   </div>

   </>
);


   return (


      
      
      <>
         <h1>TeamDetails component</h1>
         <h3>ova dva linka se koriste za prikaze u ovoj komponenti - koristi se use params (import from "react-router-dom")</h3>
         <p>
            TeamDetails: 'http://ergast.com/api/f1/2013/constructors/' + id + '/constructorStandings.json'
         </p>
         <p>
            TeamResults: 'http://ergast.com/api/f1/2013/constructors/' + id + '/results.json'
         </p>
      </>
   );
};

export default TeamDetails;


