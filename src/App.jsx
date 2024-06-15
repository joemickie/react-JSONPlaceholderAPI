import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';
import ItemEdit from './components/ItemEdit';

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <Routes>
          <Route exact path="/" element={<ItemList />} />
          <Route path="/items/:id/edit" element={<ItemEdit />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
