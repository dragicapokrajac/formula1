import { Link, useLocation } from "react-router-dom";

function Breadcrumbs() {
    //Still a work in progress!
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    let breadcrumbPath = "";

    return(
        <>
            <ul>
                <li><a href="/">Formula 1</a></li>
                {pathnames.map((name, index) => {
                breadcrumbPath += `/${name}`;
                const isLast = index === pathnames.length - 1;
                console.log(pathnames, breadcrumbPath);
 
                return isLast? (
                    <li key={breadcrumbPath}> / {name}</li>
                ) : (
                    <li key={breadcrumbPath}>
                        {" "}
                        / <Link to={breadcrumbPath}>{name}</Link>
                    </li>
                );
            })}  
            </ul>
        </>
    );
};

export default Breadcrumbs;