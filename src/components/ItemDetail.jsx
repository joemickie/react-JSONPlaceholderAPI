import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const item = storedItems.find(item => item.id === parseInt(id));
    if (item) {
      setItem(item);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => setItem(data));
    }
  }, [id]);

  const handleDelete = () => {
    let storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems = storedItems.filter(item => item.id !== parseInt(id));
    localStorage.setItem('items', JSON.stringify(storedItems));
    alert('Item deleted');
    navigate('/');
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold text-lg">{item.title}</h2>
      <p>{item.body}</p>
      <div className="flex space-x-4">
        <Link to={`/items/${id}/edit`} className="text-blue-500">Edit</Link>
        <button onClick={handleDelete} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default ItemDetail;
