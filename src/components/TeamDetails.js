const TeamDetails = () => {
   return (
      <>
         <h1>TeamDetails component</h1>
         <h3>ova dva linka se koriste za prikaze u ovoj komponenti - koristi se use params (import from "react-router-dom")</h3>
         <p>
            TeamDetails: 'http://ergast.com/api/f1/' + year + '/constructors/' + id + '/constructorStandings.json'
         </p>
         <p>
            TeamResults: 'http://ergast.com/api/f1/' + year + '/constructors/' + id + '/results.json'
         </p>
      </>
   );
};

export default TeamDetails;