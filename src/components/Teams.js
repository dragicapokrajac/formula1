import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import { showFlag, navigateHandler } from '../helpers';
import linkImg from '../img/icons/link_icon.png';
import Breadcrumbs from "./Breadcrumbs";
import SearchBar from './SearchBar';
import Header from "./Header";

const Teams = (props) => {
   const [teams, setTeams] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [isLoading, setIsLoading] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      getTeams()
   }, []);

   const getTeams = async () => {
      const url = "https://ergast.com/api/f1/2013/constructorStandings.json";
      const response = await axios.get(url);
      const dataTeams = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      setTeams(dataTeams);
      setIsLoading(false);
   };

   const filteredTeams = teams.filter(team => team.Constructor.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

   const crumbs = [
      { path: '/', label: 'F1' },
      { path: '/teams', label: 'Teams' }
   ];

   const handleNavigateTeamRaces = (id) => {
      console.log('Teams id', id);
      const route = `/teamDetails/${id}`;
      navigateHandler(route, navigate);
   };

   if (isLoading) {
      return <Loader color='#ffc300' />
   };

   return (
      <>
         <Header />
         <Breadcrumbs crumbs={crumbs} color="#ffc300" />
         <section className='component-container-column'>
            <h1>Constructors Championship</h1>
            <SearchBar
               type='text'
               placeholder='Search teams...'
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className='table-teams'>
               <thead>
                  <tr>
                     <th>Position</th>
                     <th>&nbsp;</th>
                     <th>Name</th>
                     <th>Details</th>
                     <th>Points</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredTeams.map(team =>
                     <tr key={team.Constructor.constructorId}>
                        <td>{team.position}</td>
                        <td>
                           <Flag country={showFlag(props.flagsRes, team.Constructor.nationality)} />
                        </td>
                        <td
                           onClick={() => handleNavigateTeamRaces(team.Constructor.constructorId)}
                           className="link-td"
                        >
                           {/* <div className="td-container"> */}
                           {/* <Flag country={showFlag(props.flagsRes, team.Constructor.nationality)} /> */}
                           {team.Constructor.name}
                           {/* </div> */}
                        </td>
                        <td>
                           <a
                              href={team.Constructor.url}
                              target="_blank">
                              <img src={linkImg} className="link-icon" />
                           </a>
                        </td>
                        <td>{team.points}</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </>
   );
};

export default Teams;