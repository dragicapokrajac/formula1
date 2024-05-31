import { Link } from "react-router-dom";

const Breadcrumbs = ({ tabs }) => {
    return <div>
        <div>
            <ul> {tabs?.map((crumb, i) => {
                return (
                    <ul>
                        <li key={i}>
                            {i < tabs.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<p> {crumb.name} </p>)}
                        </li>
                    </ ul>
                );
            })}
            </ul>
        </div>
    </div>

}

export default Breadcrumbs;

//Zakomentarisan Inline CSS za mogucu buducu uprotrebu
{/* {i === 0 && <img src={require("../img/icons/icons8-helmet-50.png")} style={{ width: 5, height: "auto" }} />} */}