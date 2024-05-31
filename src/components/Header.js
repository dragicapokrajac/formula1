import { Link } from "react-router-dom";
import LinkLogo from "../img/F1-logo.png";
import Navigation from "./Navigation";

const Header = () => {
   return (
      <header className="header">
         <Link to="/">
            <img src={LinkLogo} alt="Logo"></img>
         </Link>
         <Navigation />
      </header>
   );
};

export default Header;