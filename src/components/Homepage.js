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
            <NavLink to="/drivers" className='drivers-link'></NavLink>
            <NavLink to="/teams" className='teams-link'></NavLink>
            <NavLink to="/races" className='races-link'></NavLink>
         </section>

         {/* <section className="homepage-container">
            <div className="block driver-block">
               <NavLink className="driver-link" to="/drivers"></NavLink>
            </div>
            <div className="block team-block">
               <NavLink className="team-link" to="/teams"></NavLink>
            </div>
            <div className="block races-block">
               <NavLink className="races-link" to="/races"></NavLink>
            </div>
         </section> */}
      </>
   );
};

export default Homepage;