import { Link } from "react-router-dom";
import LinkLogo from "../img/F1-logo.png";

const Header = () => {
   return (
      <header className="header">
         <Link to="/">
            <li className="Logo">
               <img src={LinkLogo} alt="Logo"></img>
            </li>
         </Link>
      </header>
   );
};

export default Header;

