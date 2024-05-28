import { Link } from "react-router-dom";
// import Logo from "./img/rteam.jpg";
// import LinkDriver from "./img/Kaciga.png";
// import LinkTeams from "./img/Teams.png";
// import LinkRaces from "./img/Races.png";

const Navigation = () => {
   return (
      <nav>
         <ul>
            <li><Link to="/drivers">Drivers</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/races">Races</Link></li>
            {/* <Link to="/"><img src={Logo} alt="Logo" style={{ height: 30, width: 50 }}></img></Link>
            <li><NavLink to="/Drivers"><img src={LinkDriver} alt="Drivers" style={{ height: 30, width: 50 }}></img></NavLink></li>
            <li><NavLink to="/Teams"><img src={LinkTeams} alt="Teams" style={{ height: 30, width: 50 }}></img></NavLink></li>
            <li><NavLink to="/Races"><img src={LinkRaces} alt="Races" style={{ height: 30, width: 50 }}></img></NavLink></li> */}
         </ul>
      </nav>
   );
};

export default Navigation;