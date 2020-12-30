import React from 'react';
import './Initialpage.css';
import Login from '../Login/Login';
import img from '../../images/blob_kyh7.jpg'


const Initialpage =()=>{
    
    return(      
        <div className="home">
            <Login></Login>
            <img className="homeimage" src={img} alt=""/>
        </div>
    )
};

export default Initialpage;