import searchIcon from '../img/icons/search-icon.png';

const SearchBar = ({ type, placeholder, value, onChange }) => {
   return (
      <div className='search-wrapper'>
         <div className="search-box" >
            <input
               type={type}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
            />
            <img src={searchIcon} alt="search icon" />
         </div >
      </div>
   );
};

export default SearchBar;