import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {NFTMarketplace} from './components/NFTMarketplace';
import {CollectionPage} from './components/CollectionPage';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<NFTMarketplace />} />
          <Route path="/collections/:collectionSlug" element={<CollectionPage />} />
        </Routes>
      </Router>
  );
};

export default App;
