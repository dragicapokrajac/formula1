import { NavLink } from "react-router-dom";

const Navigation = () => {
   return (
      <div className="nav-container">
         <nav className="navigation">
            <ul>
               <li>
                  <NavLink to="/drivers" className="link drivers-hover">
                     Drivers
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/teams" className="link teams-hover">
                     Teams
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/races" className="link races-hover">
                     Races
                  </NavLink>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Navigation;