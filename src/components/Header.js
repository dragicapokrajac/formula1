import React from 'react';
import { Link } from "react-router-dom";
import LinkLogo from "../img/F1-logo.png";

const Header = () => {
    return (
        <div className="header">
            <h1>Header probni</h1>
            <Link to="/"><li className="Logo"><img src={LinkLogo} alt="Logo"></img>Logo</li></Link>
        </div>
    )
}

export default Header;

