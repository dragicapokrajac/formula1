import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const RaceResults = () => {
   const [prixDetail, setPrixDetail] = useState([])
   const [qualifyingResults, setQualifyingResults] = useState([]);
   const [raceResults, setRaceResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const params = useParams();

   useEffect(() => {
      getRaceResults();
   }, []);

   const getRaceResults = async () => {
      // console.log(params);
      try {
         const urlQualifying = `http://ergast.com/api/f1/2013/${params.id}/qualifying.json`;
         // const urlQualifying = `http://ergast.com/api/f1/2013/1/qualifying.json`;
         const resQualifying = await axios.get(urlQualifying);
         setPrixDetail(resQualifying.data.MRData.RaceTable.Races);
         setQualifyingResults(resQualifying.data.MRData.RaceTable.Races[0].QualifyingResults);

         const urlResults = `http://ergast.com/api/f1/2013/${params.id}/results.json`;
         const resRaceResults = await axios.get(urlResults);
         setRaceResults(resRaceResults.data.MRData.RaceTable.Races[0].Results);

         setIsLoading(false);
      } catch (error) {
         console.log(error);
      };
   };

   if (isLoading) {
      return <Loader />
   };

   return (
      <>
         <section>
            <h2>{prixDetail[0].raceName}</h2>
            <p>Country: {prixDetail[0].Circuit.Location.country}</p>
            <p>Location: {prixDetail[0].Circuit.Location.locality}</p>
            <p>Date: {prixDetail[0].date}</p>
            <p>Full Report: <a href={prixDetail[0].url} target="_blank">Details</a></p>
         </section>
         <br />
         <section>
            <table>
               <thead>
                  <tr>
                     <td colSpan='4'>Qualifying Results</td>
                  </tr>
                  <tr>
                     <td>Pos</td>
                     <td>Driver</td>
                     <td>Team</td>
                     <td>Best Time</td>
                  </tr>
               </thead>
               <tbody>
                  {qualifyingResults.map(qRes =>
                     <tr key={qRes.Driver.driverId}>
                        <td>{qRes.position}</td>
                        <td>{qRes.Driver.familyName}</td>
                        <td>{qRes.Constructor.name}</td>
                        <td>best time...</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
         <br />
         <section>
            <table>
               <thead>
                  <tr>
                     <td colSpan='4'>Race Results</td>
                  </tr>
                  <tr>
                     <td>Pos</td>
                     <td>Driver</td>
                     <td>Team</td>
                     <td>Result</td>
                     <td>Points</td>
                  </tr>
               </thead>
               <tbody>
                  {raceResults.map(result =>
                     <tr key={result.Driver.driverId}>
                        <td>{result.position}</td>
                        <td>{result.Driver.familyName}</td>
                        <td>{result.Constructor.name}</td>
                        <td>{result.Time?.time}</td>
                        <td>{result.points}</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </>
   );
};

export default RaceResults;