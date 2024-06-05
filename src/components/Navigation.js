import { NavLink } from "react-router-dom";

const Navigation = () => {
   return (
      // <div className="nav-container">
      <nav className="navigation">
         <ul>
            <li>
               <NavLink to="/drivers" className="link link-drivers">
                  Drivers
               </NavLink>
            </li>
            <li>
               <NavLink to="/teams" className="link link-teams">
                  Teams
               </NavLink>
            </li>
            <li>
               <NavLink to="/races" className="link link-races">
                  Races
               </NavLink>
            </li>
         </ul>
      </nav>
      // </div>
   );
};

export default Navigation;