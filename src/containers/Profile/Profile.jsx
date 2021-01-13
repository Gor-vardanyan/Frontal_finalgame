import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile =() =>{
    const [render, setRender] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem("authToken");
        var config = {
            method: 'post',
            url: 'https://finalgamedb.herokuapp.com/profile',
            headers: { 
              'Authorization': 'Bearer '+ token,
            },
          };
          axios(config)
          .then((res)=>{
            setRender(res.data)
        })
    }, []);

    return( <div>
        <div className="continer">

                <div className="selectgame">
                {render
                    ?<div>
                        <div className="sec">
                            <h2>{render.nickname}</h2>
                            <p>Email: {render.email}</p>
                            <p>Players: {render.players.map((item)=>{ return <div>{item}</div>})}</p>
                            <p>Credits: {render.credit} <img style={{ width: "20px"}} src="/Images/goldCoin.gif" alt=""/></p>
                        </div>
                    <p>win fights to get more credits</p>
                </div>
                :<div></div>
                }
                </div>
                <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
            </div>
                    
    </div>)};
export default Profile;