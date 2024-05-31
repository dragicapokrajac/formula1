import { Link } from "react-router-dom";

const Navigation = () => {
   return (
      <div className="nav-container">
         <nav className="navigation">
            <ul>
               <li>
                  <Link to="/drivers" className="link">
                     Drivers
                  </Link>
               </li>
               <li>
                  <Link to="/teams" className="link">
                     Teams
                  </Link>
               </li>
               <li>
                  <Link to="/races" className="link">
                     Races
                  </Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};

export default Navigation;