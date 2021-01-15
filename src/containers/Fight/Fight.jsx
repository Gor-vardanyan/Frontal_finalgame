import React, { useState } from 'react'
import './Fight.css'
import { connect } from 'react-redux';
import Winner from '../Winner/Winner';

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

const Fight =({user, setUser})=>{
    const [renderState,setRenderState]=useState(player_1.render(7.5, player_1.position_x, player_1.img));
    const [renderState2,setRenderState2]=useState(player_2.render(7.5, player_2.position_x, player_2.img));
    const [lifePlayer1,setLifePlayer1]=useState(player_1.renderLife());
    const [lifePlayer2,setLifePlayer2]=useState(player_2.renderLife(2));
    const [manaPlayer1,setManaPlayer1]=useState(player_1.renderMana());
    const [manaPlayer2,setManaPlayer2]=useState(player_2.renderMana(2));
    const [guard1, setGuard1] = useState(false);
    const [guard2, setGuard2] = useState(false);

    const [onAir1,setOnAir1]=useState(false);
    const [onAir2,setOnAir2]=useState(false);

    const [atackOn1,setAtackOn1]=useState(false);
    const [atackOn2,setAtackOn2]=useState(false);
    
    const [winPlayer1, setWinPlayer1] = useState(1);
    const [winPlayer2, setWinPlayer2] = useState(1);
    
    const [Declared, setDeclared] = useState(false)

    const checkRange = (pos_player1, pos_player2) =>{
        var calc = ((pos_player1 + pos_player2) - 100);
        return ( calc > -10 && calc < 5)
    };
    const checkSecialRange = (pos_player1, pos_player2) =>{
        var calc = ((pos_player1 + pos_player2) - 100);
        return ( calc > -20 && calc < 10)
    };
    const checkposition=()=>{
    let position =(player_1.getPositionPercentage()+player_2.getPositionPercentage() - 100);
       if(position > -1){
           player_1.flip = true;
           player_2.flip = true;

       } else{
        player_1.flip = false;
        player_2.flip = false;
       }
    };

    const jumpR=(item, fun, jump)=>{
        jump(true)
        fun(item.render(7.5,item.position_x,item.jump1));
        Update();
        setTimeout(()=>{
            fun(item.render(12,item.position_x,item.jump2));
            Update();
            item.move_right()
            setTimeout(()=>{
                fun(item.render(22,item.position_x,item.jump3));
                Update();
                item.move_right()
                setTimeout(()=>{
                    fun(item.render(12,item.position_x,item.jump4));
                    Update();
                    item.move_right()
                    setTimeout(()=>{
                        fun(item.render(7.5,item.position_x,item.jump1));
                        Update();
                        setTimeout(()=>{
                            fun(item.render(7.5, item.position_x, item.img));
                            Update();
                            jump(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    const jumpL=(item, fun, jump)=>{
        jump(true)
        fun(item.render(7.5,item.position_x,item.jump1));
        Update();
        setTimeout(()=>{
            fun(item.render(12,item.position_x,item.jump2));
            Update();
            item.move_left()
            setTimeout(()=>{
                fun(item.render(22,item.position_x,item.jump3));
                Update();
                item.move_left()
                setTimeout(()=>{
                    fun(item.render(12,item.position_x,item.jump4));
                    Update();
                    item.move_left()
                    setTimeout(()=>{
                        fun(item.render(7.5,item.position_x,item.jump1));
                        Update();
                        setTimeout(()=>{
                            fun(item.render(7.5, item.position_x, item.img));
                            Update();
                            jump(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    const guard =(item,fun,fun2)=>{
        console.log("pressed ",fun2)
        fun(item.render(7.5,item.position_x,item.guard));
        fun2(true);
    };

    const letguard =(item,fun,fun2)=>{
        console.log(fun2)
        fun(item.render(7.5,item.position_x,item.img));
        fun2(false);
    };

    const kick =(item,fun,attack)=>{
        attack(true);
        fun(item.render(7.5,item.position_x,item.kick1));
        Update();
        setTimeout(()=>{
            fun(item.render(7.5,item.position_x,item.kick2));
            Update();
            setTimeout(()=>{
                fun(item.render(7.5,item.position_x,item.kick3));
                Update();
                setTimeout(()=>{
                    fun(item.render(7.5,item.position_x,item.kick4));
                    Update();
                    setTimeout(()=>{
                        fun(item.render(7.5, item.position_x, item.img));
                        Update();
                        attack(false);
                    },300)
                },200)
            },200)  
        },100)
    };

    const punch =(item,fun,attack)=>{
        attack(true);
        setTimeout(()=>{
            item.attack = true;
                fun(item.render(7.5,item.position_x, item.punch));
            item.attack = false;
            setTimeout(()=>{
                fun(item.render(7.5, item.position_x, item.img));
                attack(false);
            },200)
        },200)
    };

    const soryuken=(item, fun, attack, move)=>{
        attack(true)
        fun(item.render(7.5,item.position_x,item.soryuken1));
        Update();
        if(item.flip === true){
            item.move_left()
        }else{
            item.move_right()
        }
        setTimeout((move)=>{
            fun(item.render(7.5,item.position_x,item.soryuken2));
            Update();
            if(item.flip === true){
                item.move_left()
            }else{
                item.move_right()
            }
            setTimeout((move)=>{
                fun(item.render(22,item.position_x,item.soryuken3));
                Update();
                if(item.flip === true){
                    item.move_left()
                }else{
                    item.move_right()
                }
            setTimeout(()=>{
                    fun(item.render(12,item.position_x,item.soryuken4));
                    Update();
                    setTimeout(()=>{
                        fun(item.render(7.5,item.position_x,item.soryuken5));
                        Update();
                        setTimeout(()=>{
                            fun(item.render(7.5, item.position_x, item.img));
                            attack(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    
    const endfirst=(item,item2)=>{
        player_1.game = true;
        player_2.game = true; 
        player_2.no_mana = false;
        player_1.no_mana= false;
        player_2.fight = false;
        player_1.fight= false;
        setRenderState(player_1.render(7.5, 15, player_1.img))
        setRenderState2(player_2.render(7.5, 15, player_2.img))
        setLifePlayer1(player_1.renderLife("full"))
        setLifePlayer2(player_2.renderLife("full"))

        setManaPlayer1(player_1.renderMana("full"))
        setManaPlayer2(player_2.renderMana("full"))
        checkposition()
        item(item2+1); // prarameters
        winner()       

        Update();
    }

    const winner=()=>{
        if(winPlayer2 === 2){
            return setDeclared(player_2)
        }else if(winPlayer1 === 2){
            return setDeclared(player_1)
        }
    }

    const Update = useUpdate();

    window.onkeyup=('keyup',(e)=>{
        let position1 = player_1.getPositionPercentage();
        let position2 = player_2.getPositionPercentage();

            switch (e.key){
                case 'a':
                    if(!atackOn1===true){
                        console.log("entra")
                    checkposition() // to see if they are fliped
                    if(player_1.flip===true){
                        // cheks the range, if the return is diferent dont colide
                        if(!checkRange(position1,position2)){
                            player_1.move_left() // move
                            if(!onAir1===true){
                                // if its on the air or atacking we dont render so it doesnt overlap
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                            }                            
                            Update();
                        }else{ // else they are in range they dont move
                            if(!onAir1===true){
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                            }                            
                            Update();
                        };
                    }else{
                        player_1.move_left()
                        if(!onAir1===true){
                            setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                        }
                        Update();
                    }
                    }
                    
                break;   
                case 'd':
                    if(!atackOn1===true){
                    checkposition()
                    if(player_1.flip===false){
                        if(!checkRange(position1,position2)){
                            player_1.move_right();
                            if(!onAir1===true){
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                            }
                            Update();
                        }else{
                            if(!onAir1===true){
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                            }
                            Update();
                        };
                    }else{
                        player_1.move_right();
                        if(!onAir1===true){
                            setRenderState(player_1.render(7.5, player_1.position_x, player_1.img));
                        }
                        Update();
                    }
                    }               

                break;
                // JUMP
                case 'e':
                    if(!atackOn1===true && onAir1===false){
                    jumpR(player_1,setRenderState, setOnAir1);
                    checkposition()
                    Update();
                    }
                break;
                case 'q':
                    if(!atackOn1===true && onAir1===false){
                    jumpL(player_1,setRenderState, setOnAir1);
                    checkposition()
                    Update()
                    }
                break;
                // GUARD
                case 's':   
                    if(!atackOn1===true && onAir1===false){              
                    letguard(player_1, setRenderState, setGuard1);
                    checkposition()
                    Update();
                    }
                break;
                // ATTACK
                case 'r': 
                    if(!atackOn1===true && onAir1===false){
                    checkposition();
                        if(checkRange(position1,position2)){
                        player_2.fight = false;
                        kick(player_1, setRenderState, setAtackOn1);
                        if(guard2===false){
                            player_2.get_dmg(player_1.strength*2);
                        }else{
                            player_2.get_dmg(1);
                        }
                        setLifePlayer2(player_2.renderLife(2))
                            if(!player_2.fight === false){
                                endfirst(setWinPlayer1,winPlayer1);}
                                Update();
                        }else{
                            kick(player_1, setRenderState, setAtackOn1);
                            Update();
                        }
                    }                 
                break;
                case 'f':
                    if(!atackOn1===true && onAir1===false){
                        checkposition()
                        if(checkRange(position1,position2)){
                            player_2.fight = false;
                            punch(player_1, setRenderState, setAtackOn1)
                            if(guard2===false){
                                player_2.get_dmg(player_1.strength);
                            }else{
                                player_2.get_dmg(1);
                            }
                            setLifePlayer2(player_2.renderLife(2))
                            if(!player_2.fight === false){
                                endfirst(setWinPlayer1,winPlayer1);
                            }
                            Update();
                        }else{
                            punch(player_1, setRenderState, setAtackOn1)
                            Update();
                        }
                    }
                break;
                case 'c': 
                    if(!atackOn1===true && onAir1===false){
                        checkposition()
                        if(!player_1.no_mana === true){
                            if(checkSecialRange(position1,position2)){
                                player_2.fight = false;
                                soryuken(player_1, setRenderState, setAtackOn1)
                                player_1.get_mna(20);
                                setManaPlayer1(player_1.renderMana(2))
                                if(guard2===false){
                                    player_2.get_dmg(player_1.power);
                                }else if(guard2===true){
                                    player_2.get_dmg(5);
                                }
                                setLifePlayer2(player_2.renderLife(2))
                                if(!player_2.fight === false){
                                    endfirst(setWinPlayer1,winPlayer1);             
                                }
                                Update();
                            }else{
                                player_1.get_mna(20);
                                setManaPlayer1(player_1.renderMana(2))
                                soryuken(player_1, setRenderState, setAtackOn1)
                                Update();
                            }
                        }
                    }
                break;
                // SECOND PLAYER COMANDS START HERE
                case 'j':
                    if(!atackOn2===true){
                    checkposition()
                    if(player_2.flip===false){
                        if(!checkRange(position1,position2)){
                            player_2.move_right();
                            if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                            }
                            Update();
                        }else{
                            if(!onAir2===true){
                            setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                            Update();
                            }
                        };
                    }else{
                        player_2.move_right();
                        if(!onAir2===true){
                            setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                        }
                        Update();
                    }}

                break;
                case 'l':
                    if(!atackOn2===true){
                    checkposition()
                    if(player_2.flip===true){
                        if(!checkRange(position1,position2)){
                            player_2.move_left()
                            if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                            }                            
                            Update();
                        }else{
                            if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                            }                            
                            Update();
                        };
                    }else{
                        player_2.move_left()
                        if(!onAir2===true){
                            setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img));
                        }
                        Update();
                    }}
                    
                break;
                // JUMP
                case 'o':
                    if(!atackOn2===true && onAir2===false){
                    jumpL(player_2,setRenderState2, setOnAir2);
                    checkposition()
                    Update();
                    }
                break;
                case 'u':
                    if(!atackOn2===true && onAir2===false){
                    jumpR(player_2,setRenderState2, setOnAir2);
                    checkposition()
                    Update();
                    }
                break;
                // GUARD
                case 'k':            
                    if(!atackOn2===true && onAir2===false){
                    letguard(player_2, setRenderState2, setGuard2);
                    checkposition()
                    Update();
                    }
                break;
                // ATTACK
                case 'y': 
                    if(!atackOn2===true && onAir2===false){
                        checkposition()
                        if(checkRange(position1,position2)){
                            player_1.fight = false;
                            kick(player_2,setRenderState2, setAtackOn2);
                            if(guard1===false){
                                player_1.get_dmg(player_2.strength*2);
                            }else if(guard1===true){
                                player_1.get_dmg(1);
                            }
                            setLifePlayer1(player_1.renderLife())
                            if(!player_1.fight === false){
                                endfirst(setWinPlayer2,winPlayer2);             
                            }
                            Update();
                        }else{
                            kick(player_2,setRenderState2, setAtackOn2);
                            Update();
                        }
                    }
                break;
                case 'h':
                    if(!atackOn2===true && onAir2===false){
                        checkposition()
                        if(checkRange(position1,position2)){
                            player_1.fight = false;
                            punch(player_2, setRenderState2, setAtackOn2)
                            if(guard1===false){
                                player_1.get_dmg(player_2.strength);
                            }else if(guard1===true){
                                player_1.get_dmg(1);
                            }
                            setLifePlayer1(player_1.renderLife())
                            if(!player_1.fight === false){
                                endfirst(setWinPlayer2,winPlayer2);             
                            }
                            Update();
                        }else{
                            punch(player_2, setRenderState2, setAtackOn2)
                            Update();
                        }
                    }
                break;
                case 'n': 
                    if(!atackOn2===true && onAir2===false){
                        checkposition()
                        if(!player_2.no_mana === true){
                            if(checkSecialRange(position1,position2)){
                                player_1.fight = false;
                                soryuken(player_2, setRenderState2, setAtackOn2)
                                player_2.get_mna(20);
                                setManaPlayer2(player_2.renderMana())
                                if(guard1===false){
                                    player_1.get_dmg(player_2.power);
                                }else if(guard1===true){
                                    player_1.get_dmg(5);
                                }
                                setLifePlayer1(player_1.renderLife())
                                if(!player_1.fight === false){
                                    endfirst(setWinPlayer2,winPlayer2);             
                                }
                                Update();
                            }else{
                                player_2.get_mna(20);
                                setManaPlayer2(player_2.renderMana())
                                soryuken(player_2, setRenderState2, setAtackOn2)
                                Update();
                            }
                        }
                    }
                break;  
            default: console.log("none");
                break;
        }});

        window.onkeydown =('keydown',(e)=>{
            switch (e.key){
            case 's':
                guard(player_1, setRenderState, setGuard1);
                checkposition()
                Update();
                break;
            case 'k':
                guard(player_2, setRenderState2, setGuard2);
                checkposition()
                Update();
                break; 
                default:console.log("none")
            }});
        
    const RenderGame=()=>{
        return(<div>
                    {Declared
                        ?<Winner user={user} setUser={setUser} Declared={Declared}></Winner>
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
                                <img className="imgstadium" src={'/images/background2.jpg'} alt=""/>
                            </div>    
                            <img className="imgteclado" src={'/images/teclado.png'} alt=""/>
                            <img className="homeimage" src={'/images/background.jpg'} alt=""/>
                        </div>
                    }
        
                </div>)
    }
    return RenderGame()
}

export default connect(mapStateToProps)(Fight);
