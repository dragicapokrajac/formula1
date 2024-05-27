import { CircleLoader } from "react-spinners";

const Loader = () => {
   return (
      <div className="loader-container">
         <CircleLoader color="blue" size="100px" />
      </div>
   );
};

export default Loader;