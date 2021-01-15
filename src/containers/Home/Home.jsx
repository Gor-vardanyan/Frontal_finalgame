import React from 'react'
import './Home.css'
import Login from '../Login/Login'

const Home = ({setUser}) => {
    return( 
        <div className="home">
            <Login setUser={setUser}></Login>
            <img className="homeimage" src={'/images/background.jpg'} alt=""/>
        </div>
    )
}


export default Home;