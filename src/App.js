import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Feed from './components/Feed';
import UserFeed from './components/UserFeed';
import Header from './components/Header';
import Login from './components/Login';




function App(){
    return (
      <BrowserRouter>
        <Header path="/"/>
        <Switch>
          <Route path="/" exact component={Feed} />
          <Route path="/user/:username" component={UserFeed} />
          <Route path="/login" component={Login} />

        </Switch>
      </BrowserRouter>
    );
}

export default App;
