import React, { useState, props } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Initialpage from './containers/Initialpage/Initialpage';
//import { useDispatch } from 'react-redux';


function App() {
  //const dispatch = useDispatch();
  const [user, setUser] = useState(localStorage.getItem("user"))
  console.log(user);
  return (
    <BrowserRouter>
      <Route>
        {user?<Header setUser={setUser}></Header>:<div></div>}
        <Switch>
          <Route path='/' exact >
            {user
            ?<Initialpage props={props} user={user} setUser={setUser}></Initialpage>
            :<Home user={user} setUser={setUser}></Home>}
          </Route>
        </Switch>
        {user?<Footer></Footer>:<div></div>}
      </Route>
    </BrowserRouter>
  );
}

export default App;
