import React, { useState } from 'react';

const SearchBar = (props) => {
   const [searchTerm, setSearchTerm] = useState('');

   // Ovo je placeholder component za search bar
   // import SearchBar from "./SearchBar";
   // <SearchBar /> 

   return (
      <div>
<input
                type="text"
                placeholder="Search for a drivers..."
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
   );
};

export default SearchBar;