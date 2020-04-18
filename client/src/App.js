import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { login } from './slices/userSlice';
import Navbar from "./components/Navbar";
import appAxios from './config/appAxios';
// import store from './store/index';

// Pages //
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import BuildingList from './pages/BuildingList';
import BuildingDetail from './pages/BuildingDetail';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.authenticated)
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }}/>
    )}/>
  )
}

function App() {
  const dispatch = useDispatch()

  // Checks whether token from local storage is valid or not //
  useEffect(() => {
    console.log('App use effect')
    if (localStorage.getItem('token')) {
      console.log('Get user profile')
      appAxios({
        method: 'GET',
        url: '/user',
        headers: {
          'token': localStorage.getItem('token')
        },
      })
        .then(({data}) => {
          console.log('Success!', data)
          const token = data.token
          const user = {
            id: data.id,
            name: data.name,
            email: data.email
          }
          dispatch(login({token, user}))
        })
        .catch((err) => {
          console.log('Your token is not valid', err)
        })
    }
  }, [])

  return (
    <div className="App">
      <Router>
          <Container >
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path="/building" component={BuildingList} />
              <Route path="/building/:id" component={BuildingDetail} />
              <PrivateRoute path="/user" component={UserProfile} />
              <Route path="*" component={() => "404 NOT FOUND"}/>
            </Switch>
          </Container>      
      </Router>
    </div>
  );
}

export default App;
