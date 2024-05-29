import { Link } from "react-router-dom";
// import Logo from "./img/F1-logo.png";
import LinkDriver from "../img/icons8-helmet-50.png";
import LinkTeams from "../img/icons8-race-car-80.png";
import LinkRaces from "../img/icons8-race-60.png";

const Navigation = () => {
   return (
      <nav className="wrapper">
         <ul>

            <li className="drivers"> <Link to="/drivers"> <img src={LinkDriver} alt="Drivers"></img> Drivers</Link> </li>
            <li className="teams"><Link to="/teams"><img src={LinkTeams} alt="Teams"></img>Teams</Link></li>
            <li className="races"><Link to="/races"><img src={LinkRaces} alt="Races"></img> Races</Link></li>
            {/* <Link to="/"><img src={Logo} alt="Logo" style={{ height: 30, width: 50 }}></img></Link>
            <li><NavLink to="/Drivers"><img src={LinkDriver} alt="Drivers" style={{ height: 30, width: 50 }}></img></NavLink></li>
            <li><NavLink to="/Teams"><img src={LinkTeams} alt="Teams" style={{ height: 30, width: 50 }}></img></NavLink></li>
            <li><NavLink to="/Races"><img src={LinkRaces} alt="Races" style={{ height: 30, width: 50 }}></img></NavLink></li> */}
         </ul>
      </nav>
   );
};

export default Navigation;