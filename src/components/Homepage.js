import { Link, NavLink } from "react-router-dom";
import LinkLogo from "../img/F1-logo.png";

const Homepage = () => {
   return (
      <>
         <header className="header header-logo">
            <Link to="/">
               <img src={LinkLogo} alt="Logo"></img>
            </Link>
         </header>

         <section className="homepage-container">
            <div className="block driver-block">
               <NavLink to="/drivers">Ready</NavLink>
            </div>
            <div className="block team-block">
               <NavLink to="/teams">Set</NavLink>
            </div>
            <div className="block races-block">
               <NavLink to="/races">Go</NavLink>
            </div>
         </section>
      </>
   );
};

export default Homepage;