import React from 'react';
import {
  Link,
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import AddBoxForm from './containers/AddBoxForm';
import ListBoxTable from './containers/ListBoxTable';

import './App.scss';


function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <h1>Boxinator</h1>
          <nav>
            <ul >
              <li><Link to={'/addBox'}>Add New Box</Link></li>
              <li><Link to={'/listBoxes'}>List Existing Boxes</Link></li>
            </ul>
          </nav>
        </header>

        <Switch>
          <Route exact path="/addBox" component={AddBoxForm} />
          <Route exact path="/listBoxes" component={ListBoxTable} />
          {/* set add box form page as a default form page */}
          <Redirect from="/" to="/addBox" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
