const SearchBar = ({ type, placeholder, value, onChange }) => {
   return (
      <div>
         <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
         />
      </div>
   );
};

export default SearchBar;