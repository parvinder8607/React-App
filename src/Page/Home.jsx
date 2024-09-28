import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSearch } from "../Context/SearchContext";
import Card from "../Component/Card";

const Home = () => {
    const {searchTerm} = useSearch(); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    
    
    useEffect(() => {
        const fetchData = async () => {
            if (data.length > 0) return; 
       
            setLoading(true); 
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error:', error);
                setError('Failed to fetch data'); 
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );   

    return (
        <div className="menu">
      
            {loading ? (
                <p>Loading data...</p>
            ) : error ? (
                <p>{error}</p> 
            ) : filteredData.length > 0 ? (
                filteredData.map((item) => (
                    <Card key={item.id} anime={item} />
                ))
            ) : (
                <p>No results found</p> 
            )}
        </div>
    );
};

export default Home;
