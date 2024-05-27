import { useState, useEffect } from "react";
import axios from "axios";


const Races = () => {

    const [dataRaces, setRacesDetails] = useState([]);
    useEffect(() => {
        getRacesDetails()
    }, []);

    const getRacesDetails = async () => {
        const url = "http://ergast.com/api/f1/2013/results/1.json";
        const response = await axios.get(url);
        const dataRaces = response.data.MRData.RaceTable.Races;
        setRacesDetails(dataRaces);
        console.log("Nesto", dataRaces);
    };

    return (
        <>
            <h1>Races Calendar</h1>
            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Grand Prix</th>
                        <th>Circuit</th>
                        <th>Date</th>
                        <th>Winner</th>
                    </tr>
                </thead>
                <tbody>
                    {dataRaces.map((dataRace, i) =>
                        <tr key={i}>

                            <td>{dataRace.round}</td>
                            <td>{dataRace.raceName}</td>
                            <td>{dataRace.Circuit.circuitName}</td>
                            <td>{dataRace.date}</td>
                            <td>{dataRace.Results[0].Driver.familyName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default Races;