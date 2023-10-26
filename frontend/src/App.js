// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FeedList from './components/FeedList';
import FeedDetail from './components/FeedDetail';
import { FeedProvider } from './contexts/FeedContext';

function App() {
  return (
    <Router>
      <FeedProvider>
        <Switch>
          <Route path="/" exact component={FeedList} />
          <Route path="/feed/:id" component={FeedDetail} />
          {/* ... other routes */}
        </Switch>
      </FeedProvider>
    </Router>
  );
}

export default App;