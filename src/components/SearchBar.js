import searchIcon from '../img/icons/searchicon.png';
const SearchBar = ({ type, placeholder, value, onChange }) => {
   return (
      <div className="searchBar-container">
         <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
         <img className="searchBar-icon" src={searchIcon} alt="search icon" />
      </div>
   );
};

export default SearchBar;