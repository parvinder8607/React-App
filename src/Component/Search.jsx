// Search.js
import React from 'react';
import { useSearch } from '../Context/SearchContext';

const style = {
    width: '300px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    margin: '10px',
}


export default function Search() {
    const { searchTerm, setSearchTerm } = useSearch();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <input
            type="text"
            value={searchTerm}
            style={style}
            onChange={handleInputChange}
            placeholder="Search..."
        />
    );
}
