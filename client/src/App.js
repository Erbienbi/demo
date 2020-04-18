import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import Navbar from "./components/Navbar";
import store from './store/index';

// Pages //
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BuildingList from './pages/BuildingList';
import BuildingDetail from './pages/BuildingDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Container >
              <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/login" component={UserProfile} />
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
