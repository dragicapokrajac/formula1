import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag } from '../helpers';
import linkImg from '../img/icons/link-white.png';
import Breadcrumbs from "./Breadcrumbs";

const Teams = (props) => {
   const [teams, setTeams] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
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

   const filteredTeams = teams.filter(team => {
      const fullName = `${team.Constructor.name} ${team.position}`.toLowerCase();
      return fullName.includes(searchTerm.toLowerCase());
   });

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/teams', label: 'Teams' }
   ];

   if (isLoading) {
      return <Loader />
   };

   return (
      <div>
         <Breadcrumbs crumbs={crumbs} />
         <div>
            <input
               type="text"
               placeholder="Search for a drivers..."
               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
         <h1>Constructors Championship</h1>

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
               {filteredTeams.map(team =>
                  <tr key={team.Constructor.constructorId}>
                     <td>{team.position}</td>
                     <td
                        onClick={() => handleShowTeamRaces(team.Constructor.constructorId)}
                        style={{ cursor: "pointer" }}
                     >
                        <Flag country={showFlag(props.flagsRes, team.Constructor.nationality)} />
                        {team.Constructor.name}
                     </td>
                     <td><a href={team.Constructor.url} target="_blank">Details:
                        <img src={linkImg} className='link-icon' style={{ width: "2%", height: "auto" }} />
                     </a></td>
                     <td>{team.points}</td>
                  </tr>
               )}
            </tbody>
         </table>
      </div >
   );
};

export default Teams;