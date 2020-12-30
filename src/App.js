import React, { useState } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';


function App() {
  const [user, setUser] = useState(false)

  return (
    <BrowserRouter>
      <Route>
        {user?<Header></Header>:<div></div>}
        <Switch>
          <Route path='/' exact >
            <Home user={user} setUser={setUser}></Home>
          </Route>
        </Switch>
        {user?<Footer></Footer>:<div></div>}
      </Route>
    </BrowserRouter>
  );
}

export default App;
