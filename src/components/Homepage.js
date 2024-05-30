import { Link } from "react-router-dom";

const Homepage = () => {
   return (
      <section className="homepage-container">
         <div  className="block driver-block">
            <Link to="/drivers">Drivers</Link>
         </div>
         <div className="block team-block">
            <Link to="/teams">Teams</Link>
         </div>
         <div className="block races-block">
            <Link to="/races">Races</Link>
         </div>
      </section>
   );
};

export default Homepage;