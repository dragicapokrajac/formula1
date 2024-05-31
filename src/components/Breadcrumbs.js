import { Link } from "react-router-dom";

const Breadcrumbs = ({tabs}) => {

    // const crumbs = [];

    return <div>
        <div>
            <ul> {tabs?.map((crumb, i) => {
                return (
                    <ul>
                        <li key={i}>
                            {/* {i === 0 && <img src={require("../img/icons/icons8-helmet-50.png")} style={{ maxWidth: 15 }} />} */}
                            {i < tabs.length - 1 ? (<Link to={crumb.path}>{crumb.name}</Link>) : (<span> {crumb.name} </span>)}
                        </li>
                    </ ul>
                );
            })}
            </ul>
        </div>
    </div>

}

export default Breadcrumbs;