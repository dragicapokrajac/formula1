import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/search?q=${value}`);
        setSuggestions(data.products);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [value]);

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