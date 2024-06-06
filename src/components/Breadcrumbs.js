import { NavLink } from "react-router-dom";

const Breadcrumbs = (props) => {
   let crumbs = props.crumbs;
   let color = props.color || '#272727';

   return (
      <div className="breadcrumbs">

         {crumbs?.map((crumb, i) =>
            < p key={i} style={{ backgroundColor: color }} >
               {i < crumbs.length - 1
                  ? <NavLink to={crumb.path} className="link">
                     {crumb.label}
                  </NavLink>
                  : <span> {crumb.label} </span>
               }
            </p>
         )}
      </div >
   );
};

export default Breadcrumbs;