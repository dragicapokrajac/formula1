import searchIcon from '../img/icons/search_15px.png';

const SearchBar = ({ type, placeholder, value, onChange }) => {
   return (
      <div className='search-wrapper'>
         < div class="search-box" >
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