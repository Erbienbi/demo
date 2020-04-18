import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index'
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import { Container } from 'react-bootstrap'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Container >
          <Provider store={store}>
            <Navbar />
            <Home />
          </Provider>
        </Container>
      </div>
    </BrowserRouter>
  );
}

export default App;
