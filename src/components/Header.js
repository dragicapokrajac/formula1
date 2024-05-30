import { Link } from "react-router-dom";
import LinkLogo from "../img/F1-logo.png";
import SearchBar from "./SearchBar";
import Breadcrumbs from "./Breadcrumbs";

const Header = () => {
   return (
      <header className="header">
         <Breadcrumbs />
         <Link to="/">
            <img src={LinkLogo} alt="Logo"></img>
         </Link>
         <SearchBar />
      </header>
   );
};

export default Header;