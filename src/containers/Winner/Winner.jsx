import React, { useState, useEffect } from 'react';
import './Winner.css';
import axios from 'axios';

const useUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
};

const Winner=({Declared, user, setUser})=>{
    const [Credit, setCredit] = useState(user.credit);
    const Update = useUpdate();

    useEffect(() => {
        console.log("credit 1")
        let ths = user.credit+1;
        let token = localStorage.getItem("authToken");
        var config = {
          method: 'post',
          url: 'https://finalgamedb.herokuapp.com/victory',
          headers: { 
            'Authorization': 'Bearer '+token , 
            'Content-Type': 'application/json'
          },
          data : JSON.stringify({"credit": ths })
        };
        axios(config)
        .then((res)=>{
            console.log(res.data)
            setUser(res.data)
            Update();
        })
    }, [Credit]);

    return( <div className="home">
                <div className="selectgame">            
                            <h2>{Declared.name}</h2>
                            <img style={{height: "30vh"}} src={Declared.selected} alt=""/>
                            <p className="p" >Health: {Declared.health}</p>
                            <p className="p">Mana: {Declared.mana}</p>
                            <p className="p">Power: {Declared.power}</p>
                            <p className="p">Strength: {Declared.strength}</p>
                            <p style={{margin: "5px", display: "flex",   alignItems: "center"}} className="p">Credits: {user.credit} +1 <img style={{ width: "20px"}} src="/images/goldCoin.gif" alt=""/></p>
                        </div>
                    <p>Win fights to get more credits</p>
                <img className="homeimage" src={'/images/background.jpg'} alt=""/>
            </div>)
}
export default Winner;