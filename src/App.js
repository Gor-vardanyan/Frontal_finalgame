import React, { useState, props } from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Fighters from './containers/Fighters/Fighters';
import Profile from './containers/Profile/Profile';
import Game from './containers/Game/Game';
import Home from './containers/Home/Home';
import Admin from './containers/Admin/Admin';
import Initialpage from './containers/Initialpage/Initialpage';

//import { useDispatch } from 'react-redux';

function App() {
  //const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  console.log(user);
  return (
    <BrowserRouter>
      <Route>
        {user?<Header setUser={setUser}></Header>:<div></div>}
        <Switch>
          <Route path='/' exact >
            {user
            ?<Game></Game>
            :<Home setUser={setUser}></Home>}
          </Route>
          <Route path='/game' exact>
            <Initialpage props={props} user={user} setUser={setUser}></Initialpage>
          </Route>
          <Route path='/fighters'>
            <Fighters user={user} setUser={setUser}></Fighters>
          </Route>
          <Route path='/profile'>
            <Profile user={user} setUser={setUser}></Profile>
          </Route>
          {user?.role === 1
          ?<Route path='/admin'>
          <Admin user={user} setUser={setUser}></Admin>
          </Route>
          :<Game></Game>}
          
        </Switch>
        {user?<Footer></Footer>:<div></div>}
      </Route>
    </BrowserRouter>
  );
}

export default App;
