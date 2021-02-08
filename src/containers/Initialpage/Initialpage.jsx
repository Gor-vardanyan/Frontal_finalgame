import React, { useEffect, useState }from 'react';
import './Initialpage.css';
import axios from 'axios';
import Fight from '../Fight/Fight';
import { connect } from 'react-redux';

const useUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
};

const Initialpage =({dispatch, user , setUser})=>{
    var first = {};
    var second ={};
    const [my_players, setMy_players]= useState(false);
    const [player_1,setPlayer_1]=useState();
    const [player_1_info,setPlayer_1_info]= useState(false);
    const [player_2,setPlayer_2]= useState();
    const [player_2_info,setPlayer_2_info]= useState(false);
    const [playerfixed,setPlayerfixed]= useState(1);
    const [value]= useState(3);
    const [fight,setFight]= useState(false);
    
    const Update = useUpdate();

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
            setMy_players(res.data);
            //setMyPlayer(res.data);

        });
    }, []);
    class player{
        constructor(item){
            this.name = item.name;
            this.value = item.value;
            this.img = '/images/Figheters/'+item.name+'/Pose/'+item.name+'.gif';
            this.punch ='/images/Figheters/'+item.name+'/Fight/punch.png';
            this.guard ='/images/Figheters/'+item.name+'/Fight/guard.png';
            this.jump1 ='/images/Figheters/'+item.name+'/jump/jump.png';
            this.jump2 ='/images/Figheters/'+item.name+'/jump/jump2.png';
            this.jump3 ='/images/Figheters/'+item.name+'/jump/jump3.png';
            this.jump4 ='/images/Figheters/'+item.name+'/jump/jump4.png';
            this.jump5 ='/images/Figheters/'+item.name+'/jump/jump5.png';
            this.soryuken1 ='/images/Figheters/'+item.name+'/Fight/soryuken.png';
            this.soryuken2 ='/images/Figheters/'+item.name+'/Fight/soryuken2.png';
            this.soryuken3 ='/images/Figheters/'+item.name+'/Fight/soryuken3.png';
            this.soryuken4 ='/images/Figheters/'+item.name+'/Fight/soryuken4.png';
            this.soryuken5 ='/images/Figheters/'+item.name+'/Fight/soryuken5.png';
            this.kick1 ='/images/Figheters/'+item.name+'/Fight/kick.png';
            this.kick2 ='/images/Figheters/'+item.name+'/Fight/kick2.png';
            this.kick3 ='/images/Figheters/'+item.name+'/Fight/kick3.png';
            this.kick4 ='/images/Figheters/'+item.name+'/Fight/kick4.png';
            this.selected ='/images/Figheters/'+item.name+'/Pose/Ready.gif'
            this.selected_background ='/images/Figheters/'+item.name+'/Pose/background.jpg'
            this.max_health = item.health;
            this.health = item.health;
            this.max_mana = item.mana;
            this.mana = item.mana;
            this.no_mana = false;
            this.death = '/img.jpg'
            this.strength = item.strength;
            this.power = item.power;
            this.playerfixed = 1;
            this.game = false;
            this.attack =false;
            this.flip = false;
            this.lose = 0;
            this.position_x = 15;
            this.position_y = 0;
            this.boundries = {
                min: 0,
                max: 65
            };
        };
        getHealthPercentage(){
            let porcentaje1 = this.max_health/2;
            let porcentaje2 =this.health/2;
            return (porcentaje2*porcentaje1)/100;
        };
        getManaPercentage(){
            let porcentaje1 = this.max_mana/2;
            let porcentaje2 =this.mana/2;
            return (porcentaje2*porcentaje1)/100;
        };
        getPositionPercentage(){
           return (this.position_x*100)/this.boundries.max;
        };
        get_dmg(num){
            this.health -= num;
            if((this.health*this.max_health)/100 <= 0 || (this.max_health-this.health) <= 0 ){ 
                console.log("endgame");
                this.lose = 1;
            };
        };
        get_mna(num){
            this.mana -= num;
            if((this.mana*this.max_mana)/100 <= 0 || (this.max_mana-this.mana) <= 0 ){ 
                console.log("no mana");
                this.mana = 0;
                this.no_mana = true;
            };
        };
        move_right(){
            let calc = (this.position_x - this.boundries.max)
            if(calc < -5){
                    this.position_x+=5 ;
                    Update();  
           }else{
               for (let i = calc; i <= 0; i++) {
                   console.log(i)
                   this.position_x ++ ;
                   Update();
               }
            }
        };

        move_left(){
            let calc = (this.position_x - this.boundries.min)
            if(calc > 5){
                    this.position_x -=5;
                    Update();
           }else{
               for (let i = 0; i < calc; i++) {
                   console.log(i)
                   this.position_x -- ;
                   Update();
               }
            }
        };

        render( jump, posit, process, id, displayState){
            let styleish= {};
            if(this.game === true){
                this.position_x = posit
            }
            if(this.flip === true){
                let pos = this.position_x;
                styleish = {
                    position: "absolute",
                    left: `${pos}vw`, 
                    bottom: `${jump}vh`,
                    transform: "rotateY(180deg)" }
 
                if(this.attack === true){
                    console.log("attaked")
                    styleish = {
                        position: "absolute",
                        left: `${posit}vw`, 
                        bottom: `${jump}vh`,
                        transform: "rotateY(180deg)" }
                        
                    return(<div style={styleish} >
                    <img id={id+"-img"} style={{display: "none"}}className="charactersize" src={this.img} alt=""/>
                    <img id={id+"-punch"} style={{display: "none"}}className="charactersize" src={this.punch} alt=""/>

                    <img id={id+"-jump1"}  style={{display: "none"}} className="charactersize" src={this.jump1} alt=""/>
                    <img id={id+"-jump2"}  style={{display: "none"}} className="charactersize" src={this.jump2} alt=""/>
                    <img id={id+"-jump3"}  style={{display: "none"}} className="charactersize" src={this.jump3} alt=""/>
                    <img id={id+"-jump4"}  style={{display: "none"}} className="charactersize" src={this.jump4} alt=""/>

                    <img id={id+"-kick1"}  style={{display: "none"}} className="charactersize" src={this.kick1} alt=""/>
                    <img id={id+"-kick2"}  style={{display: "none"}} className="charactersize" src={this.kick2} alt=""/>
                    <img id={id+"-kick3"}  style={{display: "none"}} className="charactersize" src={this.kick3} alt=""/>
                    <img id={id+"-kick4"}  style={{display: "none"}} className="charactersize" src={this.kick4} alt=""/>

                    <img id={id+"-soryuken1"}  style={{display: "none"}} className="charactersize" src={this.soryuken1} alt=""/>
                    <img id={id+"-soryuken2"}  style={{display: "none"}} className="charactersize" src={this.soryuken2} alt=""/>
                    <img id={id+"-soryuken3"}  style={{display: "none"}} className="charactersize" src={this.soryuken3} alt=""/>
                    <img id={id+"-soryuken4"}  style={{display: "none"}} className="charactersize" src={this.soryuken4} alt=""/>
                    <img id={id+"-soryuken5"}  style={{display: "none"}} className="charactersize" src={this.soryuken5} alt=""/>

                    </div>);
                }
            }else{
                styleish = {
                    position: "absolute",
                    left: `${posit}vw`, 
                    bottom: `${jump}vh` }
                    
            };
            return(<div style={styleish} >
                    <img id={id+"-img"} style={{display: "none"}}className="charactersize" src={this.img} alt=""/>
                    <img id={id+"-guard"} style={{display: "none"}}className="charactersize" src={this.guard} alt=""/>

                    <img id={id+"-punch"} style={{display: "none"}}className="charactersize" src={this.punch} alt=""/>

                    <img id={id+"-jump1"}  style={{display: "none"}} className="charactersize" src={this.jump1} alt=""/>
                    <img id={id+"-jump2"}  style={{display: "none"}} className="charactersize" src={this.jump2} alt=""/>
                    <img id={id+"-jump3"}  style={{display: "none"}} className="charactersize" src={this.jump3} alt=""/>
                    <img id={id+"-jump4"}  style={{display: "none"}} className="charactersize" src={this.jump4} alt=""/>

                    <img id={id+"-kick1"}  style={{display: "none"}} className="charactersize" src={this.kick1} alt=""/>
                    <img id={id+"-kick2"}  style={{display: "none"}} className="charactersize" src={this.kick2} alt=""/>
                    <img id={id+"-kick3"}  style={{display: "none"}} className="charactersize" src={this.kick3} alt=""/>
                    <img id={id+"-kick4"}  style={{display: "none"}} className="charactersize" src={this.kick4} alt=""/>

                    <img id={id+"-soryuken1"}  style={{display: "none"}} className="charactersize" src={this.soryuken1} alt=""/>
                    <img id={id+"-soryuken2"}  style={{display: "none"}} className="charactersize" src={this.soryuken2} alt=""/>
                    <img id={id+"-soryuken3"}  style={{display: "none"}} className="charactersize" src={this.soryuken3} alt=""/>
                    <img id={id+"-soryuken4"}  style={{display: "none"}} className="charactersize" src={this.soryuken4} alt=""/>
                    <img id={id+"-soryuken5"}  style={{display: "none"}} className="charactersize" src={this.soryuken5} alt=""/>

                    </div>);
        };

        renderLife(num){
            let life = this.max_health - this.health;
            let percentage = (life * 100)/this.max_health;
            let actual_health = ((100*100)/100) - percentage;

            let back = {
                width: `100%`,
                height: "5vh",
                backgroundColor: "red",
                border: "2px solid",
                borderColor: "black",
                alignItems: "center",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "flex-start",
            } 
            if(num===2){
                back = {
                    width: `100%`,
                    height: "5vh",
                    backgroundColor: "red",
                    border: "2px solid",
                    borderColor: "black",
                    alignItems: "center",
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                }
            }
            
           let styleish = {
                width: `${actual_health}%`,
                height: "4.4vh",
                backgroundColor: "yellow",
                border: "2px solid",
                borderColor: "white",
                color: "black",
                alignItems: "center",
                borderRadius: "18px",
                display: "flex",
                justifyContent: "center",
            }
            if(num==="full"){
                this.health =this.max_health
                 styleish = {
                    width: `${this.max_health}%`,
                    height: "4.4vh",
                    backgroundColor: "yellow",
                    border: "2px solid",
                    borderColor: "white",
                    color: "black",
                    alignItems: "center",
                    borderRadius: "18px",
                    display: "flex",
                    justifyContent: "center",
                }
            }
            
            return (
                <div style={back}>
                <div style={styleish}>{this.health}</div>
                </div>);
        };
        renderMana(num){
            let energy = this.max_mana - this.mana;
            let percentage = (energy * 100)/this.max_mana;
            let actual_mana = ((100*100)/100) - percentage;
           
            let back = {
                width: `100%`,
                height: "4vh",
                backgroundColor: "gray",
                border: "2px solid",
                borderColor: "black",
                alignItems: "center",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "flex-start",
            } 
            if(num===2){
                back = {
                    width: `100%`,
                    height: "4vh",
                    backgroundColor: "gray",
                    border: "2px solid",
                    borderColor: "black",
                    alignItems: "center",
                    borderRadius: "15px",
                    display: "flex",
                    justifyContent: "flex-end",
                    
                }
            }
            let styleish = {
                width: `${actual_mana}%`,
                height: "3.5vh",
                backgroundColor: "blue",
                border: "2px solid",
                borderColor: "white",
                color: "black",
                alignItems: "center",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
            }
            if(num==="full"){
                this.mana =this.max_mana
                    styleish = {
                    width: `${this.max_mana}%`,
                    height: "3.5vh",
                    backgroundColor: "blue",
                    border: "2px solid",
                    borderColor: "white",
                    color: "black",
                    alignItems: "center",
                    borderRadius: "15px",
                    display: "flex",
                    justifyContent: "center"
                }
            }

             return (<div style={back}>
                    <div style={styleish}>{this.mana}</div>
                    </div>);
        }
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
            :<button onClick={ () => fixplayer(item) }>Pick</button>
            }
            </div>);
    };
    const fixplayer=(item)=>{
        if(playerfixed===1){
            
        }
        setPlayerfixed(playerfixed+1)
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
                    ?<Fight user={user} setUser={setUser} ></Fight>
                    :<div className="home2">
                        {my_players
                        ?<div className="myp">
                            <div>My players</div>
                            <div className="picker">
                                {my_players.map((item)=>{ 
                                    return (
                                    <div onClick={()=> selectorController(playerfixed, item)} className='picksize'>
                                    <img src={'/images/Figheters/'+item.name+'/Img/pick'+item.name.toLowerCase()+'.png'} alt=""></img>
                                    </div>)
                                    })}
                            </div>
                        </div>
                        :<div></div>
                        }
                        <div className="contenedor">
                            <div className="player1">
                                {player_1
                                ?<div className="adjust">
                                {playerfixed >=2
                                    ?<div className="fixed">{player_1_info}</div>
                                    :<div>{player_1_info}</div>} 
                                </div>
                                :<div></div>
                                }                    
                            </div>
                            <div className="game">
                                <div className="player1_image">
                                {player_1
                                    ?<div>
                                        <img className="player_size1" src={player_1.selected} alt=""/>
                                        <img className="player_back" src={player_1.selected_background} alt=""/>
                                        </div>
                                    :<div></div>
                                }</div>
                                <div className="player2_image">
                                {player_2
                                    ?<div>
                                        <img className="player_size2" src={player_2.selected} alt=""/>
                                        <img className="player_back" src={player_2.selected_background} alt=""/>
                                    </div>
                                    :<div></div>
                                }</div>
                            </div>
                            <div className="player2">
                            {player_2
                                ?<div className="adjust2">
                                    {playerfixed === 3
                                    ?<div className="fixed2">{player_2_info}</div>
                                    :<div>{player_2_info}</div>}
                                    </div>
                                :<div></div>
                                } 
                            </div>
                            <img className="homeimage" src={'/images/background.jpg'} alt=""/>
                        </div>
                        {value === playerfixed
                            ?<div style={{position: "absolute", justifyContent: "center", alignItems: "center",left: "47.5vw",top: "53vh"}}>
                                <button className="fightbutton" onClick={()=>play()}>Fight!</button>
                                </div>
                            :<div></div>
                        }
                    </div>
                }
            </div>
    )
};
export default connect(null)(Initialpage);
