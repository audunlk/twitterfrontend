import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Feed from './components/Feed';
import UserFeed from './components/UserFeed';
import Header from './components/Header';




function App(){
    return (
      <BrowserRouter>
        <Header path="/"/>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/user/:username" component={UserFeed} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
