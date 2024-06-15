import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemEdit = () => {
  const { id } = useParams();
  const [item, setItem] = useState({ title: '', body: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const item = storedItems.find(item => item.id === parseInt(id));
    if (item) {
      setItem(item);
    } else {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => setItem({ title: data.title, body: data.body }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({ ...prevItem, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const index = storedItems.findIndex(item => item.id === parseInt(id));
    if (index >= 0) {
      storedItems[index] = { ...item, id: parseInt(id) };
    } else {
      storedItems.push({ ...item, id: parseInt(id) });
    }
    localStorage.setItem('items', JSON.stringify(storedItems));
    alert('Item updated');
    navigate(`/items/${id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Title</label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleChange}
          className="w-full p-2 border rounded text-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Body</label>
        <textarea
          name="body"
          value={item.body}
          onChange={handleChange}
          className="w-full p-2 border rounded text-lg"
          rows="10"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
    </form>
  );
};

export default ItemEdit;
