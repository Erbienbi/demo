import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { login, ownerLogin } from './slices/userSlice';
import Navbar from "./components/Navbar";
import appAxios from './config/appAxios';

// Pages //
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Profile from './pages/Profile';
import OwnerLogin from './pages/OwnerLogin';
import OwnerRegister from './pages/OwnerRegister';
import BuildingList from './pages/BuildingList';
import BuildingDetail from './pages/BuildingDetail';
import AddBuilding from './pages/AddBuilding';
import AddRoom from './pages/AddRoom';
import RoomList from './pages/RoomList';
import RoomDetail from './pages/RoomDetail';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.user.authenticated)
  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login-user',
            state: { from: props.location }
        }}/>
    )}/>
  )
}

const OwnerOnly = ({ component: Component, ...rest }) => {
  const isOwner = useSelector(state => state.user.isOwner)
  return (
    <Route {...rest} render={(props) => (
      isOwner === true
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login-owner',
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
      appAxios({
        method: 'GET',
        url: '/user',
        headers: {
          'token': localStorage.getItem('token')
        },
      })
        .then(({data}) => {
          console.log('Success using user token!', data)
          const token = localStorage.getItem('token')
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
    } else if (localStorage.getItem('owner_token')) {
      appAxios({
        method: 'GET',
        url: '/owner',
        headers: {
          'token': localStorage.getItem('owner_token')
        },
      })
        .then(({data}) => {
          console.log('Success using owner token!', data)
          const token = localStorage.getItem('owner_token')
          const owner = {
            id: data.id,
            name: data.name,
            email: data.email
          }
          dispatch(ownerLogin({token, owner}))
        })
        .catch((err) => {
          console.log('The owner token is not valid', err)
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
              <Route path="/register-user" component={UserRegister} />
              <Route path="/login-user" component={UserLogin} />
              <Route path="/register-owner" component={OwnerRegister} />
              <Route path="/login-owner" component={OwnerLogin} />

              <Route exact path="/room" component={RoomList} />
              <Route exact path="/building" component={BuildingList} />
              
              <Route exact path="/host/:BuildingId/:RoomId" component={RoomDetail} />
              <Route path="/host/:BuildingId" component={BuildingDetail} />

              <PrivateRoute path="/profile" component={Profile} />

              <OwnerOnly path="/add-building" component={AddBuilding} />
              <OwnerOnly path="/add-room" component={AddRoom} />

              <Route path="*" component={() => "404 NOT FOUND"}/>
            </Switch>
          </Container>      
      </Router>
    </div>
  );
}

export default App;
