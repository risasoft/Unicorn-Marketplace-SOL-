import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NFTMarketplace from './components/NFTMarketplace';
import CollectionPage from './components/CollectionPage';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={NFTMarketplace} />
          <Route path="/collections/:collectionSlug" component={CollectionPage} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
