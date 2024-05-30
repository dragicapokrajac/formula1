import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Flag from "react-flagkit";

const RaceResults = ({ flagsRes, showFlag }) => {
   const [qualifyingResults, setQualifyingResults] = useState([]);
   const [raceResults, setRaceResults] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const params = useParams();

   useEffect(() => {
      getRaceResults();
   }, []);

   const getRaceResults = async () => {
      try {
         const resQualifying = await axios.get(`http://ergast.com/api/f1/2013/${params.id}/qualifying.json`);
         setQualifyingResults(resQualifying.data.MRData.RaceTable.Races[0]);

         const resRaceResults = await axios.get(`http://ergast.com/api/f1/2013/${params.id}/results.json`);
         setRaceResults(resRaceResults.data.MRData.RaceTable.Races[0].Results);

         setIsLoading(false);
      } catch (error) {
         console.log(error);
      };
   };

   let bestTime = [];

   if (isLoading) {
      return <Loader />
   };



   const getColor = (points) => {
      console.log(points)
      switch (points) {
         case "25":
            return "yellow";
         case "18":
            return "darkgray";
         case "15":
            return "orange";
         case "12":
         case "10":
         case "8":
         case "6":
         case "4":
         case "2":
         case "1":
            return "lightgreen";

         default:
            return "gray";
      };


   };



   return (
      <>
         <section>
            <Flag country={showFlag(flagsRes, qualifyingResults?.Circuit.Location.country)} />
            <table>
               <thead>
                  <tr><th>{qualifyingResults.raceName}</th></tr>
               </thead>
               <tbody>
                  <tr>
                     <td>Country: </td>
                     <td>{qualifyingResults.Circuit.Location.country}</td>
                  </tr>
                  <tr>
                     <td>Location: </td>
                     <td>{qualifyingResults.Circuit.Location.locality}</td>
                  </tr>
                  <tr>
                     <td>Date: </td>
                     <td>{qualifyingResults.date}</td>
                  </tr>
                  <tr>
                     <td>Full Report: </td>
                     <td><a href={qualifyingResults.url} target="_blank">Details</a></td>
                  </tr>
               </tbody>
            </table>
         </section>
         <br />
         <section>
            <table>
               <thead>
                  <tr>
                     <th colSpan='4'>Qualifying Results</th>
                  </tr>
                  <tr>
                     <th>Pos</th>
                     <th>Driver</th>
                     <th>Team</th>
                     <th>Best Time</th>
                  </tr>
               </thead>
               <tbody>
                  {qualifyingResults.QualifyingResults.map(qRes =>
                     <tr key={qRes.Driver.driverId}>
                        <td>{qRes.position}</td>
                        <td>
                           <Flag country={showFlag(flagsRes, qRes.Constructor.nationality)} />
                           {qRes.Driver.familyName}
                        </td>
                        <td>{qRes.Constructor.name}</td>
                        <td>{bestTime = [qRes.Q1, qRes.Q2, qRes.Q3].sort()[0]}</td>
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
                     <th colSpan='4'>Race Results</th>
                  </tr>
                  <tr>
                     <th>Pos</th>
                     <th>Driver</th>
                     <th>Team</th>
                     <th>Result</th>
                     <th>Points</th>
                  </tr>
               </thead>
               <tbody>
                  {raceResults.map(result =>
                     <tr key={result.Driver.driverId}>
                        <td>{result.position}</td>
                        <td>
                           <Flag country={showFlag(flagsRes, result.Driver.nationality)} />
                           {result.Driver.familyName}
                        </td>
                        <td>{result.Constructor.name}</td>
                        <td>{result.Time?.time}</td>
                        <td style={{ backgroundColor: getColor(result.points) }}> {result.points}

                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </>
   );
};

export default RaceResults;