import { NavLink } from "react-router-dom";

const Homepage = () => {
   return (
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
   );
};

export default Homepage;