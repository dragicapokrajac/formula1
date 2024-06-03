import { Link } from "react-router-dom";

const Homepage = () => {
   return (
      <section className="homepage-container">
         <div className="block driver-block">
            <Link to="/drivers">
               <div className="block driver-block">
                  Drivers
               </div>
            </Link>
         </div>
         <div className="block team-block">
            <Link to="/teams">
               <div className="block team-block">
                  Teams
               </div>
            </Link>
         </div>
         <div className="block races-block">
            <Link to="/races">
               <div className="block races-block">
                  Races
               </div>
            </Link>
         </div>
      </section>
   );
};

export default Homepage;