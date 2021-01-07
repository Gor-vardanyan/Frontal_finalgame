import React, { useEffect, useState }from 'react';
import './Initialpage.css';
import axios from 'axios';
import Fight from '../Fight/Fight';
import { connect } from 'react-redux';



const Initialpage =({dispatch})=>{
    var first = {};
    var second ={};
    const [my_players, setMy_players]= useState(false);
    const [player_1,setPlayer_1]=useState();
    const [player_1_info,setPlayer_1_info]=useState(false);
    const [player_2,setPlayer_2]=useState();
    const [player_2_info,setPlayer_2_info]=useState(false);
    const [playerfixed,setPlayerfixed]=useState(1);
    const [value]=useState(3);
    const [fight,setFight]=useState(false);

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
    }, []);
    class player{
        constructor(item){
            this.name = item.name;
            this.value = item.value;
            this.img = '/images/Figheters/'+item.name+'/Pose/'+item.name+'.gif';
            this.punch = '/images/Figheters/'+item.name+'/Fight/punch.png';
            this.max_health = item.health;
            this.health = item.health;
            this.is_atacking = false;
            this.mana = item.mana;
            this.strength = item.strength;
            this.power = item.power;
            this.playerfixed = 1;
            this.position_x = 15;
            this.boundries = {
                min: 0,
                max: 65
            };
            this.position_y = 0;
        };
        getCurrentHealth(){
            return this.health;
        };
        getHealthPercentage(){
            return (this.health*this.max_health)/100;
        };
        getPositionPercentage(){
           return (this.position_x*100)/this.boundries.max;
        };
        get_dmg(num){
            this.health -= num;
            if((this.health*this.max_health)/100 === 0 || (this.health*this.max_health)/100  <= 0 ){ 
                console.log("endgame")
               this.playON();
            };
        };
        move_right(){
            if(this.position_x < this.boundries.max){
                this.position_x += 5;
            };
        };
        move_left(){
            if(this.position_x > this.boundries.min){
                this.position_x -= 5;                
            };
        };
        move_up(){
        return console.log("a")
        };

        move_bottom(){
        };

        isAtacking(status){
            this.is_atacking = status; 
            return this.is_atacking;
        };

        renderPlayer(f){
            let styleish={};
            let pos = this.position_x;
                styleish = {
                    position: "absolute",
                    left: `${pos}vw`, 
                    bottom: "0vh",
                    boxShadow: "0px, 16px, 20px, -20px",
                };
            if(f==="f" && !this.is_atacking){              
                console.log("update")
                return (<div style={styleish} >
                    <img className="charactersize" src={this.punch} alt=""/>
                    </div>);
            }else{
                return (<div style={styleish} >
                        <img className="charactersize" src={this.img} alt=""/>
                        </div>);
            };   
        };
    
        playON(){
            let winner = "";
            if(this.health > 0){
                winner = this.name+" is the winner" ;
                console.log(winner);
            };
        return(<div>{winner}</div>);
        };

        renderLife(){
           let actual_health = this.getHealthPercentage();
           console.log("actual health "+actual_health)
           let styleish ={
                width: `${actual_health}%`,
                height: "5vh",
                backgroundColor: "#4CAF50",
                border: "solid 2px"
            }
            return (<div style={styleish}></div>);
        };
    }; 
    
    const renderStats=( item,clase = false)=>{
        return(<div>
            <h2>{item.name}</h2>
            <p>Health:{item.health}</p>
            <p>Mana:{item.mana}</p>
            <p>Strength:{item.strength}</p>
            <p>Power:{item.power}</p>
            <p>{item.description}</p>
            {clase
            ?<div></div>
            :<button onClick={ () => setPlayerfixed(playerfixed+1) }>Pick</button>
            }
            </div>);
    };

    const player_selector = (num,item)=>{

        switch(num){
            case 1:
                first = new player(item);
                dispatch({ type: "player_1", payload: first, player_2 });
                setPlayer_1(first);
                setPlayer_1_info(renderStats(item));

                break;
    
            case 2: 
                second = new player(item);
                dispatch({ type: "player_2", player_1, payload: second });

                setPlayer_2(second);
                setPlayer_2_info(renderStats(item));

                break;   
            default: console.log("none");
                break
        }
    }
    const selectorController = (num, item) => {
        if(num===1){
            
        player_selector(num, item)
        } else if(num===2){
            player_selector(num, item)
        };
    };
    const play=()=>{
        setFight(true)
    };



    return( <div>     
                {fight
                    ?<Fight ></Fight>
                    :<div className="home2">
                    {my_players
                    ?<div className="picker">
                            {my_players.map((item)=>{ 
                                return (
                                <div onClick={()=> selectorController(playerfixed, item)} className='picksize'>
                                <img src={'/images/Figheters/'+item.name+'/Img/pick'+item.name.toLowerCase()+'.png'} alt=""></img>
                                </div>)
                                })}
                    </div>
                    :<div></div>
                    }
                    <div className="contenedor">
                        <div className="player1">
                            {player_1
                            ?<div className="centered">{player_1_info}</div>
                            :<div></div>
                            }                    
                        </div>
                        <div className="game">
                            <div className="player1_image">
                            {player_1
                                ?<img className="player_size" src={player_1.img} alt=""/>
                                :<div></div>
                            }</div>
                            <div className="player2_image">
                            {player_2
                                ?<img className="player_size" src={player_2.img} alt=""/>
                                :<div></div>
                            }</div>
                        </div>
                        <div className="player2">
                        {player_2
                            ?<div className="centered">{player_2_info}</div>
                            :<div></div>
                            } 
                        </div>
                        <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
                    </div>
                    {value === playerfixed
                        ?<div className="fightbutton"><button onClick={()=>play()}>Fight!</button></div>
                        :<div></div>
                    }
                    </div>
                }
            </div>
    )
};
export default connect(null)(Initialpage);
