import React, { useEffect, useState }from 'react';
import './Initialpage.css';
import img from '../../images/blob_kyh7.jpg'
import axios from 'axios';


const Initialpage =({user})=>{
    const [my_players,setMy_players]= useState(false);

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
            setMy_players(res.data)

        });
    }, [])

        const renderStats =(item)=>{
            return (<div>
            <h2>{item.name}</h2>
            <p>Health:{item.health}</p>
            <p>Mana:{item.mana}</p>
            <p>Strength:{item.strength}</p>
            <p>Power:{item.power}</p>
            <p>{item.description}</p>
            </div>)
        };

    const [player_1_info,setPlayer_1_info] =useState(false)
    const [player_img, setPlayer_img] =useState(false)

    const player_selector= (item) =>{
        switch(item.name){
            case "Ryu": 
                setPlayer_img(<img src={'/images/Figheters/'+item.name+'/Pose/'+item.name+'.png'} alt=""></img>)
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)            
                break;
            
            case "Ken": 
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)  
                break;

            case "Akuma": 
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)
                break;

            case "Retsu": 
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)
                break;

            case "Blanka": 
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)
                break;

            case "ChunLi":
                setPlayer_1_info(<div className="player_info">{renderStats(item)}</div>)
                break;
            
            default: 
            console.log("none")
                break;
        } 
    }

    return(      
        <div className="home2">
            {my_players
            ?<div className="picker">{
                    my_players.map((item)=>{ 
                        return (
                            <div onClick={()=>player_selector(item)} className='picksize'>
                                <img src={'/images/Figheters/'+item.name+'/Img/pick'+item.name.toLowerCase()+'.png'} alt=""></img>
                            </div>)
                    })
                }
                
            </div>
            :<div></div>
            }
            <div className="contenedor">
                <div className="player1">
                    {player_1_info}</div>
                <div className="game">
                    {player_1_info
                    ?<dvi className="pose">{player_img}<button>Pick</button></dvi>
                    :<dvi></dvi>}
                </div>
                <div className="player2"></div>

                <img className="homeimage" src={img} alt=""/>
        </div></div>
    )
};

export default Initialpage;