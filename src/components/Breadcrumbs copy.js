import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
    //Still a work in progress!
    //Originalni breadcrumbs kao bacup
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter(x => x);
    let breadcrumbPath = "";

    return(
        <nav>
            <ul>
                <Link to={"/"}>Formula 1</Link>
                {pathnames.map((name, index) => {
                breadcrumbPath += `/${name}`;
                const isLast = index === pathnames.length - 1;
 
                return isLast? (
                    <p key={breadcrumbPath}> / {name}</p>
                ) : (
                    <p key={breadcrumbPath}> 
                    {" "} / <Link to={breadcrumbPath}>{name}</Link>
                    </p>
                );
            })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;