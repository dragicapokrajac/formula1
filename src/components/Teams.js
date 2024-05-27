import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Teams = () => {
  const [teams, setTeams] = useState([]);
    return (
        <>
            <h1>Teams component</h1>
        </>
    );

    
    useEffect(() => {
      // Fetch data from the API
      axios.get('http://ergast.com/api/f1/2013/constructorStandings.json')
        .then((response) => {
          // Extract the team data from the response
          const teamData = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
          setTeams(teamData);
        })
    }, []);
  
    console.log(teams)
    return (
      <div>
        <h1>Formula One Teams</h1>
        <ul>
          {/* {teams.map((team) => (
            <li key={team.Constructor.constructorId}>{team.Constructor.name}</li>
          ))} */}
        </ul>
      </div>
    );
};


export default Teams;