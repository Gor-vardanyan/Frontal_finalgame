import React from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Route>
        <Header></Header>
        <Switch>
          <Route path='/' exact >
            <Home></Home>
          </Route>
        </Switch>
        <Footer></Footer>
        </Route>
    </BrowserRouter>
  );
}

export default App;
