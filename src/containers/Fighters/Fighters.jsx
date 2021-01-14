import React, { useEffect, useState } from 'react';
import './Fighters.css';
import axios from 'axios';

const Fighters =({user,setUser}) =>{
    const [player, setplayer] = useState();
    const [info, setInfo] = useState(false)
    const [allplayers, setAllPlayers]= useState(false);
    const [myPlayers,setMyPlayers] = useState(false);
    const [creditos, setCreditos] = useState(user.credit)
    const [Updater, setUpdater] = useState(0)

    useEffect(() => {   
        let token = localStorage.getItem("authToken");
        var config = {
            method: 'post',
            url: 'https://finalgamedb.herokuapp.com/player/show',
            headers: { 
              'Authorization': 'Bearer '+ token,  
            }
          };
          
        axios(config)
        .then(res =>{
            setMyPlayers(res.data);
            console.log(myPlayers)
        });
    }, [Updater])

    useEffect(() => {
        let token = localStorage.getItem("authToken");
        var config = {
            method: 'post',
            url: 'https://finalgamedb.herokuapp.com/admin/player/show',
            headers: { 
              'Authorization': 'Bearer '+ token,  
            }
          };
          
        axios(config)
        .then(res =>{
            setAllPlayers(res.data);
        });
    }, []);

    class Fighters{
        constructor(item){
            this.name = item.name;
            this.value = item.value;
            this.img = '/images/Figheters/'+item.name+'/Pose/'+item.name+'.gif';
            this.selected ='/images/Figheters/'+item.name+'/Pose/Ready.gif'
            this.selected_background ='/images/Figheters/'+item.name+'/Pose/background.jpg'
            this.health = item.health;
            this.mana = item.mana;
            this.strength = item.strength;
            this.power = item.power;
        };
    }

    const selectorController = (item) => {
        let first = new Fighters(item);
        setplayer(first);
        let owned = false;
        myPlayers.forEach(element => {
            if(element.name === item.name){
                owned = true
            }
        });
        setInfo(renderStats(item,owned));

    };

    const renderStats=(item,poss)=>{
        return(<div>
            <h2>{item.name}</h2>
            <p>Health: {item.health}</p>
            <p>Mana: {item.mana}</p>
            <p>Strength: {item.strength}</p>
            <p>Power: {item.power}</p>
            <p>{item.description}</p>
            <p>Value in credits: {item.value}</p>
            {poss
            ?<div>Player in possesion</div>
            :<button onClick={()=>{buynewplayer(item)}}>buy</button>}
            </div>);
    };

    const buynewplayer=(item)=>{
        
        let data = {players: item.name};
        let token = localStorage.getItem('authToken');
        let config = {
        method: 'post',
        url: 'https://finalgamedb.herokuapp.com/buy/player',
        headers: { 
            'Authorization': 'Bearer '+ token, 
        },
        data : data
        };

        axios(config)
        .then((res)=>{
            let response = res.data.status;
            if(!response===false){
                let token = localStorage.getItem("authToken");
                let conf = {
                    method: 'post',
                    url: 'https://finalgamedb.herokuapp.com/profile',
                    headers: { 
                    'Authorization': 'Bearer '+ token,
                    },
                };
                axios(conf)
                .then((res)=>{
                setUser(res.data);
                localStorage.setItem('user',JSON.stringify(res.data));
                setCreditos(res.data.credit);
                setUpdater(Updater+1);
                setInfo(renderStats(item,true))
                })
            }else{
                alert(res.data.message)
            }
        })
    };

    return( <div>
        <div className="continer">
        <div className="home2">
            {allplayers?<div className="picker">
                            {allplayers.map((item)=>{return (
                                <div onClick={()=> selectorController(item)} className='picksize'>
                                    <img src={'/images/Figheters/'+item.name+'/Img/pick'+item.name.toLowerCase()+'.png'} alt=""></img>
                                </div>)})}
                        </div>
            :<div></div>}
            <div className="nfocontent">
            <div style={{display: "flex", alignItems: "center"}}><h2>Credits: {creditos}</h2><img style={{ width: "20px"}} src="/Images/goldCoin.gif" alt=""/></div>
            <div className="sinfocontent">

                {info?<div style={{ height: "57vh", width: "20vw", color: "white" }}>{info}
                    <img className="player" src={player.selected} alt=""/>
                    </div>:<div></div>}
                <div>
                    {player?<div><img className="player_back" src={player.selected_background} alt=""/>
                        </div>:<div></div>}   
                    </div>
                </div>
            </div>
            <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
        </div>
                        
        </div>
    </div>)};
export default Fighters;