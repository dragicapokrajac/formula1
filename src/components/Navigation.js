import { Link } from "react-router-dom";
import LinkDriver from "../img/icons/icons8-helmet-50.png";
import LinkTeams from "../img/icons/icons8-race-car-80.png";
import LinkRaces from "../img/icons/icons8-race-60.png";

const Navigation = () => {
   return (
      <div className="nav-container">
         <nav className="navigation">
            <ul>
               <li>
                  <Link to="/drivers" className="link">
                     <img src={LinkDriver} alt="Drivers" />
                     <span>Drivers</span>
                  </Link>
               </li>
               <li>
                  <Link to="/teams" className="link">
                     <img src={LinkTeams} alt="Teams" />
                     <span>Teams</span>
                  </Link>
               </li>
               <li>
                  <Link to="/races" className="link">
                     <img src={LinkRaces} alt="Races" />
                     <span>Races</span>
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Navigation;