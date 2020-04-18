import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index'
import Navbar from "./components/Navbar"
import { Container } from 'react-bootstrap'

// Pages //
import Home from './components/Home'


function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Container >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route exact path="/building" component={BuildingList} />
                <Route path="/building/:id" component={BuildingDetail} />
              </Switch>
          </Container>
        </Provider>        
      </Router>
    </div>
  );
}

export default App;
