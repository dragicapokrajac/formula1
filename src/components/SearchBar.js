import React, {useState } from 'react';

const SearchBar = () => {
  const [value, setValue] = useState('');


// Ovo je placeholder component za search bar
// import SearchBar from "./SearchBar";
// <SearchBar /> 


  return (
    <div>
      <input
        type="text"
        placeholder="Search data..."
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      {/* Display suggestions based on 'suggestions' state */}
    </div>
  );
};

export default SearchBar;