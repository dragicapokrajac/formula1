import { MoonLoader } from "react-spinners";

const Loader = ({ color }) => {
   return (
      <div className="loader-container">
         <MoonLoader
            color={color}
            size={100}
         />
      </div>
   );
};

export default Loader;