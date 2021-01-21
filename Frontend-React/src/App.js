import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import { ClientList } from "./components/ClientsList";
import { CreateClient } from "./components/CreateClient";
import { UpdateClient } from "./components/UpdateClient";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Redirect exact from="/" to="/client/list" />
          <Route path="/client/list" component={ClientList} />
          <Route path="/client/create" component={CreateClient} />
          <Route path="/client/edit/:id" component={UpdateClient} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
