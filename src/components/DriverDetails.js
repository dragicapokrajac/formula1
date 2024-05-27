const DriverDetails = () => {
   return (
      <>
         <h1>DriverDetails component</h1>
         <h3>ova dva linka se koriste za prikaze u ovoj komponenti - koristi se use params (import from "react-router-dom")</h3>
         <p>
            DriverDetails:  'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/driverStandings.json'
         </p>
         <p>
            DriverRaces: 'http://ergast.com/api/f1/' + year + '/drivers/' + id + '/results.json'
         </p>
      </>
   );
};

export default DriverDetails;