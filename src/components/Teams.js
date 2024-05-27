import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Teams = () => {
   const [teams, setTeams] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getTeams()
   }, []);

   const getTeams = async () => {
      const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
      const response = await axios.get(url);
      const dataTeams = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setTeams(dataTeams);
      setIsLoading(false);
   };

   const handleShowTeamRaces = (id) => {
      const link = `/teamDetails/${id}`;
      navigate(link);
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <div>
         <table>
            <thead>
               <tr>
                  <th>Position</th>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Points</th>
               </tr>
            </thead>
            <tbody>
               {teams.map(team =>
                  <tr key={team.Constructor.constructorId}>
                     <td>{team.position}</td>
                     <td
                        onClick={() => handleShowTeamRaces(team.Constructor.constructorId)}
                        style={{ cursor: "pointer" }}
                     >
                        {team.Constructor.name}
                     </td>
                     <td><a href={team.Constructor.url}>Details</a></td>
                     <td>{team.points}</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div >
   );
};

export default Teams;