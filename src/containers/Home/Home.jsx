import React from 'react'
import './Home.css'
import img from '../../images/blob_kyh7.jpg'
import Login from '../Login/Login'
import { Route } from 'react-router-dom'

const Home = ({user, setUser}) => {
    return( 
        <div className="home">
            <Login setUser={setUser}></Login>
            <img className="homeimage" src={img} alt=""/>
        </div>
    )
}


export default Home;