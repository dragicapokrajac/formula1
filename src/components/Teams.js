import { useState, useEffect } from "react";
import axios from "axios";

const Teams = () => {

    const [teams, setTeamsDetails] = useState ([]);
    useEffect(() => {
        getTeamsDetails()
    }, []);

    const getTeamsDetails = async () =>{
        const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
        const response = await axios.get(url);
      const dataTeams = response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
        setTeamsDetails(dataTeams);
        console.log("Teamdata",dataTeams);
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
        {teams.map((team, i) => (
            <tr key={i}>
                <td>{team.position}</td>
                <td>{team.Constructor.name}</td>
                <td><a href={team.Constructor.url}>Details</a></td>
                <td>{team.points}</td>
            </tr>
        ))}
    </tbody>
</table>
  </div >     
    );
};

export default Teams;