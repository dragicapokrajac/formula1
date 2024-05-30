import { Link } from "react-router-dom";
import LinkDriver from "../img/icons/icons8-helmet-50.png";
import LinkTeams from "../img/icons/icons8-race-car-80.png";
import LinkRaces from "../img/icons/icons8-race-60.png";

const Navigation = () => {
   return (
      <nav className="navigation">
         <ul>
            <li>
               <img src={LinkDriver} alt="Drivers" />
               <Link to="/drivers"
                  className="link">Drivers</Link>
            </li>
            <li>
               <img src={LinkTeams} alt="Teams" />
               <Link to="/teams" className="link">Teams</Link>
            </li>
            <li>
               <img src={LinkRaces} alt="Races" />
               <Link to="/races" className="link">Races</Link>
            </li>
         </ul>
      </nav>
   );
};

export default Navigation;