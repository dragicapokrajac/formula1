import { NavLink } from "react-router-dom";

const Homepage = () => {
   return (
      <section className="homepage-container">
         <div  className="block driver-block">
            <NavLink to="/drivers" className="block">Drivers</NavLink>
         </div>
         <div className="block team-block">
            <NavLink to="/teams" className="block">Teams</NavLink>
         </div>
         <div className="block races-block">
            <NavLink to="/races" className="block">Races</NavLink>
         </div>
      </section>
   );
};

export default Homepage;