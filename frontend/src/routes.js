import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateSpot from './pages/CreateSpot';

export default function Routes() {
  return (
    <BrowserRouter> 
      <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/create-spot" component={CreateSpot} />

      </Switch>
    </BrowserRouter>
  );
}
