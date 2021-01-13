import React, { useState } from 'react'
import './Fight.css'
import { connect } from 'react-redux';

var player_1= {}
var player_2= {}

const mapStateToProps = (state)=> {
    player_1 = state.player_1;
    player_2 = state.player_2
}


const useUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
};

const Fight =()=>{
    const [renderState,setRenderState]=useState(player_1.renderPlayer());
    const [renderState2,setRenderState2]=useState(player_2.renderPlayer());
    const [lifePlayer1,setLifePlayer1]=useState(player_1.renderLife());
    const [lifePlayer2,setLifePlayer2]=useState(player_2.renderLife(2));
    const [manaPlayer1,setManaPlayer1]=useState(player_1.renderMana());
    const [manaPlayer2,setManaPlayer2]=useState(player_2.renderMana(2));
    const [guard1, setGuard1] = useState(false);
    const [guard2, setGuard2] = useState(false);
    const [onair,setOnAir]=useState(false);
    const [atackOn1,setAtackOn1]=useState(true);
    const [atackOn2,setAtackOn2]=useState(true);
    const [winner, setWinner] = useState(false);
    
    const checkRange = (pos_player1, pos_player2) =>{
        var calc = ((pos_player1 + pos_player2) - 100);
        console.log("posicion 1"+pos_player1)
        console.log("posicion 2"+pos_player2)
        console.log("interacion de pos"+calc)

        return ( calc > -10 && calc < 10)
    };
    const checkposition=()=>{
    let position =(player_1.getPositionPercentage()+player_2.getPositionPercentage() - 100);
       if(position > 0){
           player_1.flip = true;
           player_2.flip = true;

       } else{
        player_1.flip = false;
        player_2.flip = false;
       }
    };
    const jumpR=(item,fun)=>{
        setOnAir(true)
    fun(item.render(7.5,item.position_x,item.jump1));
    console.log("1")
    setTimeout(()=>{
        console.log("2")
        fun(item.render(12,item.position_x,item.jump2));
        item.move_right()
        setTimeout(()=>{
            console.log("3")
            fun(item.render(22,item.position_x,item.jump3));
            item.move_right()
            setTimeout(()=>{
                console.log("4")
                fun(item.render(12,item.position_x,item.jump4));
                item.move_right()
                setTimeout(()=>{
                    console.log("5")
                    fun(item.render(7.5,item.position_x,item.jump1));
                    setTimeout(()=>{
                        console.log("6")
                        fun(item.renderPlayer());
                        setOnAir(false)
                    },200)
                },300)
            },200)
        },200)  
    },100)

    };
    const jumpL=(item,fun)=>{
        setOnAir(true)
    fun(item.render(7.5,item.position_x,item.jump1));
    console.log("1")
    setTimeout(()=>{
        console.log("2")
        fun(item.render(12,item.position_x,item.jump2));
        item.move_left()
        setTimeout(()=>{
            console.log("3")
            fun(item.render(22,item.position_x,item.jump3));
            item.move_left()
            setTimeout(()=>{
                console.log("4")
                fun(item.render(12,item.position_x,item.jump4));
                item.move_left()
                setTimeout(()=>{
                    console.log("5")
                    fun(item.render(7.5,item.position_x,item.jump1));
                    setTimeout(()=>{
                        console.log("6")
                        fun(item.renderPlayer());
                        setOnAir(false)
                    },200)
                },300)
            },200)
        },200)  
    },100)

  

    };
    const guard =(item,fun,fun2)=>{
        fun(item.render(7.5,item.position_x,item.guard));
        fun2(true);
    };
    const letguard =(item,fun,fun2)=>{
        fun(item.render(7.5,item.position_x,item.img));
        fun2(false);
    };
    const kick =(item,fun)=>{
    setOnAir(true)
    fun(item.render(7.5,item.position_x,item.kick1));
    console.log("1")
    setTimeout(()=>{
        console.log("2")
        fun(item.render(7.5,item.position_x,item.kick2));
        setTimeout(()=>{
            console.log("3")
            fun(item.render(7.5,item.position_x,item.kick3));
            setTimeout(()=>{
                console.log("4")
                fun(item.render(7.5,item.position_x,item.kick4));
                setTimeout(()=>{
                    console.log("5")
                    fun(item.renderPlayer());
                    setOnAir(false)
                },300)
            },200)
        },200)  
    },100)

    };
    const Update = useUpdate();

    window.onkeyup=('keyup',(e)=>{
        let position1 = player_1.getPositionPercentage();
        let position2 = player_2.getPositionPercentage();
            switch (e.key){
                case 'a':
                    checkposition()
                    if(player_1.flip===true){
                        if(!checkRange(position1,position2)){
                            player_1.move_left()
                            if(onair===false){
                                setRenderState(player_1.renderPlayer());
                            }                            
                            Update();
                        }else{
                            if(onair===false){
                                setRenderState(player_1.renderPlayer());
                            }                            
                            Update();
                        };
                    }else{
                        player_1.move_left()
                        if(onair===false){
                            setRenderState(player_1.renderPlayer());
                        }
                        Update();
                    }
                    
                break;   
                case 'd':
                    checkposition()
                    if(player_1.flip===false){
                        if(!checkRange(position1,position2)){
                            player_1.move_right();
                            if(onair===false){
                                setRenderState(player_1.renderPlayer());
                            }
                            Update();
                        }else{
                            if(onair===false){
                                setRenderState(player_1.renderPlayer());
                            }
                            Update();
                        };
                    }else{
                        player_1.move_right();
                        if(onair===false){
                            setRenderState(player_1.renderPlayer());
                        }
                        Update();
                    }               

                break;
                case 'e':
                    if(onair===false){
                    jumpR(player_1,setRenderState);
                    checkposition()
                    Update()}
                break;
                case 'q':
                    if(onair===false){
                    jumpL(player_1,setRenderState);
                    checkposition()
                    Update()}
                break;
                case 's':                 
                    letguard(player_1,setRenderState,setGuard1);
                    checkposition()
                    Update();
                break;
                case 'k': 
                    letguard(player_2,setRenderState2,setGuard2);
                    checkposition()
                    Update();
                break;
                case 'r': 
                if(onair===false){
                    kick(player_1,setRenderState);
                    checkposition();
                    Update()};                 
                break;
                case 'c': console.log("c is power")
                break;
                case 'n': console.log("n is power")
                break;
                case 'y': if(onair===false){
                    kick(player_2,setRenderState2);
                    checkposition();
                    Update()};
                break;
                case 'u':
                    jumpR(player_2,setRenderState2);
                    checkposition()
                    Update();
                break;
                case 'o':
                    jumpL(player_2,setRenderState2);
                    checkposition()
                    Update();
                break;
                case 'f':
                    checkposition()
                    if(atackOn1 === true){
                        setRenderState(player_1.renderPlayer("f"));
                        player_1.isAtacking(true);
                    }
                    if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                        player_2.get_dmg(player_1.strength);
                        setLifePlayer2(player_2.renderLife(2))
                        Update();
                        
                        if(player_1.fight === false || player_2.fight === false){
                            setWinner(true);
                        };
                    };
                    setAtackOn1(false);
                    
                    setTimeout(()=>{
                        player_1.isAtacking(false);
                        setRenderState(player_1.renderPlayer());
                        setAtackOn1(true);
                    },200)
                    Update();

                break;
                case 'j':
                    checkposition()
                    if(player_2.flip===false){
                        if(!checkRange(position1,position2)){
                            player_2.move_right();
                            if(onair===false){
                                setRenderState2(player_2.renderPlayer());
                            }
                            Update();
                        }else{
                            setRenderState2(player_2.renderPlayer());
                            Update();
                        };
                    }else{
                        player_2.move_right();
                        if(onair===false){
                            setRenderState2(player_2.renderPlayer());
                        }
                        Update();
                    }   

                break;
                case 'l':
                    checkposition()
                    if(player_2.flip===true){
                        if(!checkRange(position1,position2)){
                            player_2.move_left()
                            if(onair===false){
                                setRenderState2(player_2.renderPlayer());
                            }                            
                            Update();
                        }else{
                            if(onair===false){
                                setRenderState2(player_2.renderPlayer());
                            }                            
                            Update();
                        };
                    }else{
                        player_2.move_left()
                        if(onair===false){
                            setRenderState2(player_2.renderPlayer());
                        }
                        Update();
                    }
                    
                break;
                case 'h':
                    checkposition()

                    if(atackOn2 === true){
                        setRenderState2(player_2.renderPlayer("f"));
                        player_2.isAtacking(true);
                    }
                    if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                        player_1.get_dmg(player_2.strength);
                        setLifePlayer1(player_1.renderLife())
                        Update();
                        
                        if(player_1.fight === false || player_2.fight === false){
                            console.log("true")
                            setWinner(true);
                            Update();

                        };
                    };
                    setAtackOn2(false);
                    
                    setTimeout(()=>{
                        player_2.isAtacking(false);
                        setRenderState2(player_2.renderPlayer());
                        setAtackOn2(true);
                    },200)
                    Update();

                break;
            default: console.log("none");
                break;
        }});

        window.onkeydown =('keydown',(e)=>{
            if(e.key==='s'){
                guard(player_1,setRenderState,setGuard1);
                checkposition()
                Update();
            }else if(e.key==='k'){
                guard(player_2,setRenderState2,setGuard2);
                checkposition()
                Update();
            }});
        
    const RenderGame=()=>{
        return(<div>
                    {winner
                        ?<div></div>
                        :<div className="fighter">
                            <div className="life">
                            {player_1
                            ?<div className="cont2">
                                <div className="lifespawn">
                                    {lifePlayer1}
                                </div>
                                <div className="manaspawn">
                                    {manaPlayer1}
                                {player_1.name}
                                </div>
                            </div>

                            :<div></div>
                            } 
                                <img className="vs" src="/images/vs.png" alt=""/>
                                {player_2
                            ?<div className="cont">
                                <div className="lifespawn">
                                    {lifePlayer2}
                                </div>
                                <div className="manaspawn">
                                    {manaPlayer2}
                                {player_2.name}
                                </div>
                            </div>
                            :<div></div>
                            } 
                            </div>
                            <div className="stadium">
                                {player_1
                                    ?<div className="noflip">{renderState}</div>
                                    :<div></div>
                                }
                                {player_2
                                    ?<div className="flip">{renderState2}</div>
                                    :<div></div>
                                }
                                <img className="imgstadium" src={'/Images/background2.jpg'} alt=""/>
                            </div>    
                            <img className="imgteclado" src={'/Images/teclado.png'} alt=""/>
                            <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
                        </div>
                    }
        
                </div>)
    }
    return RenderGame()
}

export default connect(mapStateToProps)(Fight);
