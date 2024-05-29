import { Link } from "react-router-dom";
import LinkDriver from "../img/icons/icons8-helmet-50.png";
import LinkTeams from "../img/icons/icons8-race-car-80.png";
import LinkRaces from "../img/icons/icons8-race-60.png";

const Navigation = () => {
   return (
      <nav className="wrapper">
         <ul>
            <li className="drivers"><img src={LinkDriver} alt="Drivers"></img> <Link to="/drivers">Drivers</Link> </li>
            <li className="teams"><img src={LinkTeams} alt="Teams"></img><Link to="/teams">Teams</Link></li>
            <li className="races"><img src={LinkRaces} alt="Races"></img><Link to="/races">Races</Link></li>
         </ul>
      </nav>
   );
};

export default Navigation;