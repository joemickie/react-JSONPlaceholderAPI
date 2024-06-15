import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    if (storedItems.length > 0) {
      setItems(storedItems);
    } else {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
          setItems(data);
          localStorage.setItem('items', JSON.stringify(data));
        });
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.id} className="p-4 border rounded shadow">
          <h2 className="font-bold text-lg">{item.title}</h2>
          <p>{item.body.length > 100 ? item.body.substring(0, 100) + '...' : item.body}</p>
          <Link to={`/items/${item.id}`} className="text-blue-500">View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
