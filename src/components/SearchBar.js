import React, { useEffect, useRef } from 'react';
import searchIcon from '../img/icons/search_15px.png';

const SearchBar = ({ type, placeholder, value, onChange }) => {
   const inputRef = useRef(null);

   useEffect(() => {
      const searchBoxClick = () => {
         inputRef.current.classList.toggle('expanded');
      };
      const searchBox = document.querySelector('.search-box');
      searchBox.addEventListener('click', searchBoxClick);

      return () => {
         searchBox.removeEventListener('click', searchBoxClick);
      };
   }, []);

   return (
      <div className='search-wrapper'>
         <div className="search-box">
            <input
               ref={inputRef}
               className="input-search"
               type={type}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
            />
            <button>
               <img src={searchIcon} alt="search icon" />
            </button>
         </div>
      </div>
   );
};

export default SearchBar;
