import React, { useState } from 'react';

const SearchBar = ({ type, placeholder, value, onChange }) => {
   const [searchTerm, setSearchTerm] = useState('');

   // Ovo je placeholder component za search bar
   // import SearchBar from "./SearchBar";
   // <SearchBar /> 

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