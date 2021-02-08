import React, { useState, useEffect } from 'react'
import './Fight.css'
import { connect } from 'react-redux';
import Winner from '../Winner/Winner';

var player_1= {}
var player_2= {}

const mapStateToProps = (state)=> {
    player_1 = state.player_1;
    player_2 = state.player_2;
}


const useUpdate = () => {
    const set = useState(0)[1];
    return () => set((s) => s + 1);
};

const Fight =({user, setUser})=>{
    //RENDER JUGADOR
    const [renderState,setRenderState]=useState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
    const [renderState2,setRenderState2]=useState(player_2.render(7.5, player_2.position_x, player_2.img, "player_2", "none"));
    const [lifePlayer1,setLifePlayer1]=useState(player_1.renderLife());
    const [lifePlayer2,setLifePlayer2]=useState(player_2.renderLife(2));
    const [manaPlayer1,setManaPlayer1]=useState(player_1.renderMana());
    const [manaPlayer2,setManaPlayer2]=useState(player_2.renderMana(2));
    
    //ESTADOS JUGADOR
    const [guard1, setGuard1] = useState(false);
    const [guard2, setGuard2] = useState(false);

    const [onAir1,setOnAir1]=useState(false);
    const [onAir2,setOnAir2]=useState(false);

    const [atackOn1,setAtackOn1]=useState(false);
    const [atackOn2,setAtackOn2]=useState(false);
    
    //ESTADOS JUEGO
    const [winPlayer1, setwinPlayer1] = useState(1);
    const [winPlayer2, setwinPlayer2] = useState(1);

    const [Declared, setDeclared] = useState(false);
    
    const [block1] = useState("player_1-img");
    const [block2] = useState("player_2-img");

    useEffect(() => {
        document.getElementById(block1).style.display="block";
        document.getElementById(block2).style.display="block";
    }, [block1,block2])

    useEffect(() => {
        endfirst();             
    }, [winPlayer1,winPlayer2]);

    //FUNCIONES DE COMBATE
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

    const jumpR=(item, fun, jump , name)=>{
        jump(true)
        document.getElementById( name+"-img").style.display="none";
        fun(item.render(7.5,item.position_x,item.jump1, name, "none"));
        document.getElementById( name+"-jump1").style.display="block";
        Update();
        setTimeout(()=>{
            document.getElementById( name+"-jump1").style.display="none";
            fun(item.render(12,item.position_x,item.jump2, name, "none"));
            document.getElementById( name+"-jump2").style.display="block";
            Update();
            item.move_right()
            setTimeout(()=>{
                document.getElementById( name+"-jump2").style.display="none";
                fun(item.render(22,item.position_x,item.jump3, name, "none"));
                document.getElementById( name+"-jump3").style.display="block";
                Update();
                item.move_right()
                setTimeout(()=>{
                    document.getElementById( name+"-jump3").style.display="none";
                    fun(item.render(12,item.position_x,item.jump4, name, "none"));
                    document.getElementById( name+"-jump4").style.display="block";
                    Update();
                    item.move_right()
                    setTimeout(()=>{
                        document.getElementById( name+"-jump4").style.display="none";
                        fun(item.render(7.5,item.position_x,item.jump1, name, "none"));
                        document.getElementById( name+"-jump1").style.display="block";
                        Update();
                        setTimeout(()=>{
                            document.getElementById( name+"-jump1").style.display="none";
                            fun(item.render(7.5, item.position_x, item.img, name, "none"));
                            document.getElementById( name+"-img").style.display="block";
                            Update();
                            jump(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    const jumpL=(item, fun, jump , name)=>{
        jump(true)
        document.getElementById( name+"-img").style.display="none";
        fun(item.render(7.5,item.position_x,item.jump1, name, "none"));
        document.getElementById( name+"-jump1").style.display="block";
        Update();
        setTimeout(()=>{
            document.getElementById( name+"-jump1").style.display="none";
            fun(item.render(12,item.position_x,item.jump2, name, "none"));
            document.getElementById( name+"-jump2").style.display="block";
            Update();
            item.move_left()
            setTimeout(()=>{
                document.getElementById( name+"-jump2").style.display="none";
                fun(item.render(22,item.position_x,item.jump3, name, "none"));
                document.getElementById( name+"-jump3").style.display="block";
                Update();
                item.move_left()
                setTimeout(()=>{
                    document.getElementById( name+"-jump3").style.display="none";
                    fun(item.render(12,item.position_x,item.jump4, name, "none"));
                    document.getElementById( name+"-jump4").style.display="block";
                    Update();
                    item.move_left()
                    setTimeout(()=>{
                        document.getElementById( name+"-jump4").style.display="none";
                        fun(item.render(7.5,item.position_x,item.jump1, name, "none"));
                        document.getElementById( name+"-jump1").style.display="block";
                        Update();
                        setTimeout(()=>{
                            document.getElementById( name+"-jump1").style.display="none";
                            fun(item.render(7.5, item.position_x, item.img, name, "none"));
                            document.getElementById( name+"-img").style.display="block";
                            Update();
                            jump(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    const guard =(item,fun,fun2, name)=>{
        console.log("pressed ",fun2)
        document.getElementById( name+"-img").style.display="none";
        fun(item.render(7.5,item.position_x,item.guard, name));
        document.getElementById( name+"-guard").style.display="block";
        fun2(true);
    };

    const letguard =(item,fun,fun2, name )=>{
        console.log(fun2)
        document.getElementById( name+"-guard").style.display="none";
        fun(item.render(7.5,item.position_x,item.img, name));
        document.getElementById( name+"-img").style.display="block";
        fun2(false);
    };

    const kick =( item, fun, attack, name)=>{
        attack(true);
        document.getElementById( name+"-img").style.display="none";
        fun(item.render( 7.5, item.position_x, item.kick1, name));
        document.getElementById( name+"-kick1").style.display="block";
        Update();
        setTimeout(()=>{
            document.getElementById( name+"-kick1").style.display="none";
            fun(item.render( 7.5, item.position_x, item.kick1, name));
            document.getElementById( name+"-kick2").style.display="block";            Update();
            setTimeout(()=>{
                document.getElementById( name+"-kick2").style.display="none";
                fun(item.render( 7.5, item.position_x, item.kick1, name));
                document.getElementById( name+"-kick3").style.display="block";                Update();
                setTimeout(()=>{
                    document.getElementById( name+"-kick3").style.display="none";
                    fun(item.render( 7.5, item.position_x, item.kick1, name));
                    document.getElementById( name+"-kick4").style.display="block";                    Update();
                    setTimeout(()=>{
                        document.getElementById( name+"-kick4").style.display="none";
                        fun(item.render( 7.5, item.position_x, item.kick1, name));
                        document.getElementById( name+"-img").style.display="block";                        Update();
                        attack(false);
                    },300)
                },200)
            },200)  
        },100)
    };

    const punch =( item, fun, attack, name)=>{
        attack(true);
        setTimeout(()=>{
            item.attack = true;
            document.getElementById( name+"-img").style.display="none";
                fun(item.render(7.5,item.position_x, item.punch, name));
                document.getElementById( name+"-punch").style.display="block";
            item.attack = false;
            setTimeout(()=>{
                document.getElementById( name+"-punch").style.display="none";
                fun(item.render(7.5, item.position_x, item.img, name));
                document.getElementById( name+"-img").style.display="block";
                attack(false);
            },200)
        },200)
    };

    const soryuken=(item, fun, attack, name)=>{
        attack(true)
        document.getElementById( name+"-img").style.display="none";
        fun(item.render(7.5,item.position_x,item.soryuken1, name));
        document.getElementById( name+"-soryuken1").style.display="block";
        Update();
        if(item.flip === true){
            item.move_left()
        }else{
            item.move_right()
        }
        setTimeout(()=>{
            document.getElementById( name+"-soryuken1").style.display="none";
            fun(item.render(7.5,item.position_x,item.soryuken2, name));
            document.getElementById( name+"-soryuken2").style.display="block";
            Update();
            if(item.flip === true){
                item.move_left()
            }else{
                item.move_right()
            }
            setTimeout(()=>{
                document.getElementById( name+"-soryuken2").style.display="none";
                fun(item.render(22,item.position_x,item.soryuken3, name));
                document.getElementById( name+"-soryuken3").style.display="block";
                Update();
                if(item.flip === true){
                    item.move_left()
                }else{
                    item.move_right()
                }
            setTimeout(()=>{
                document.getElementById( name+"-soryuken3").style.display="none";
                    fun(item.render(12,item.position_x,item.soryuken4, name));
                    document.getElementById( name+"-soryuken4").style.display="block";
                    Update();
                    setTimeout(()=>{
                        document.getElementById( name+"-soryuken4").style.display="none";
                        fun(item.render(7.5,item.position_x,item.soryuken5, name));
                        document.getElementById( name+"-soryuken5").style.display="block";
                        Update();
                        setTimeout(()=>{
                            document.getElementById( name+"-soryuken5").style.display="none";
                            fun(item.render(7.5, item.position_x, item.img, name));
                            document.getElementById( name+"-img").style.display="block";
                            attack(false)
                        },150)
                    },150)
                },150)
            },150)  
        },100)
    };

    const Update = useUpdate();

    window.onkeyup=('keyup',(e)=>{
        let position1 = player_1.getPositionPercentage();
        let position2 = player_2.getPositionPercentage();
        
            switch (e.key){
                case 'a':
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true){
                            console.log("entra")
                        checkposition() // to see if they are fliped
                        if(player_1.flip===true){
                            // cheks the range, if the return is diferent dont colide
                            if(!checkRange(position1,position2)){
                                player_1.move_left() // move
                                if(!onAir1===true){
                                    // if its on the air or atacking we dont render so it doesnt overlap
                                    setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
                                }                            
                                Update();
                            }else{ // else they are in range they dont move
                                if(!onAir1===true){
                                    setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none" ));
                                }                            
                                Update();
                            };
                        }else{
                            player_1.move_left()
                            if(!onAir1===true){
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
                            }
                            Update();
                        }
                        }
                    }}
                break;   
                case 'd':
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true){
                        checkposition()
                        if(player_1.flip===false){
                            if(!checkRange(position1,position2)){
                                player_1.move_right();
                                if(!onAir1===true){
                                    setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
                                }
                                Update();
                            }else{
                                if(!onAir1===true){
                                    setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
                                }
                                Update();
                            };
                        }else{
                            player_1.move_right();
                            if(!onAir1===true){
                                setRenderState(player_1.render(7.5, player_1.position_x, player_1.img, "player_1" , "none"));
                            }
                            Update();
                        }
                        }               
                    }}
                break;
                // JUMP
                case 'e':
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true && onAir1===false){
                        jumpR(player_1,setRenderState, setOnAir1, "player_1");
                        checkposition()
                        Update();
                        }
                    }}
                break;
                case 'q':
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true && onAir1===false){
                        jumpL(player_1,setRenderState, setOnAir1, "player_1");
                        checkposition()
                        Update()
                        }
                    }}
                break;
                // GUARD
                case 's':   
                    if( player_1.lose === player_2.lose ){
                        if(!atackOn1===true && onAir1===false){              
                            letguard(player_1, setRenderState, setGuard1, "player_1" , "none");
                            checkposition()
                            Update();
                        }
                    }
                break;
                // ATTACK
                case 'r': 
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true && onAir1===false){
                            checkposition();
                            if(checkRange(position1,position2)){
                            player_2.fight = false;
                            kick(player_1, setRenderState, setAtackOn1, "player_1" , "none");
                            if(guard2===false){
                                player_2.get_dmg(player_1.strength*2);
                            }else{
                                player_2.get_dmg(1);
                            }
                            setLifePlayer2(player_2.renderLife(2))
                                if(player_2.lose === 1){
                                    setTimeout(() => {
                                        if(winPlayer1 === 1){
                                            console.log("primera winPlayer1 ="+winPlayer1)
                                            setwinPlayer1(2)
                                        }else{
                                            console.log("segunda winPlayer1 ="+ winPlayer1)
                                            setwinPlayer1(3)
                                        } 
                                    }, 1000);       
                                }
                                Update();
                            }else{
                                kick(player_1, setRenderState, setAtackOn1, "player_1" , "none");
                                Update();
                            }
                        }    
                    }}   
                break;
                case 'f':
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true && onAir1===false){
                            checkposition()
                            if(checkRange(position1,position2)){
                                player_2.fight = false;
                                punch(player_1, setRenderState, setAtackOn1, "player_1" , "none")
                                if(guard2===false){
                                    player_2.get_dmg(player_1.strength);
                                }else{
                                    player_2.get_dmg(1);
                                }
                                setLifePlayer2(player_2.renderLife(2))
                                if(player_2.lose === 1){
                                    setTimeout(() => {
                                        if(winPlayer1 === 1){
                                            console.log("primera winPlayer1 ="+winPlayer1)
                                            setwinPlayer1(2)
                                        }else{
                                            console.log("segunda winPlayer1 ="+ winPlayer1)
                                            setwinPlayer1(3)
                                        } 
                                    }, 1000);    
                                }
                                Update();
                            }else{
                                punch(player_1, setRenderState, setAtackOn1, "player_1" , "none")
                                Update();
                            }
                        }
                    }}
                break;
                case 'c': 
                    if( player_1.lose === player_2.lose ){
                        if(!guard1 === true){
                        if(!atackOn1===true && onAir1===false){
                            checkposition()
                            if(!player_1.no_mana === true){
                                if(checkSecialRange(position1,position2)){
                                    player_2.fight = false;
                                    soryuken(player_1, setRenderState, setAtackOn1, "player_1" , "none")
                                    player_1.get_mna(20);
                                    setManaPlayer1(player_1.renderMana(2))
                                    if(guard2===false){
                                        player_2.get_dmg(player_1.power);
                                    }else if(guard2===true){
                                        player_2.get_dmg(5);
                                    }
                                    setLifePlayer2(player_2.renderLife(2))
                                    if(player_2.lose === 1){
                                        setTimeout(() => {
                                            if(winPlayer1 === 1){
                                                console.log("primera winPlayer1 ="+winPlayer1)
                                                setwinPlayer1(2)
                                            }else{
                                                console.log("segunda winPlayer1 ="+ winPlayer1)
                                                setwinPlayer1(3)
                                            } 
                                        }, 1000);                             
                                    }
                                    Update();
                                }else{
                                    player_1.get_mna(20);
                                    setManaPlayer1(player_1.renderMana(2))
                                    soryuken(player_1, setRenderState, setAtackOn1, "player_1" , "none")
                                    Update();
                                }
                            }
                        }
                    }}
                break;
                // SECOND PLAYER COMANDS START HERE
                case 'j':
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true){
                        checkposition()
                        if(player_2.flip===false){
                            if(!checkRange(position1,position2)){
                                player_2.move_right();
                                if(!onAir2===true){
                                    setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                                }
                                Update();
                            }else{
                                if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                                Update();
                                }
                            };
                        }else{
                            player_2.move_right();
                            if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                            }
                            Update();
                        }}
                    }}
                break;
                case 'l':
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true){
                        checkposition()
                        if(player_2.flip===true){
                            if(!checkRange(position1,position2)){
                                player_2.move_left()
                                if(!onAir2===true){
                                    setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                                }                            
                                Update();
                            }else{
                                if(!onAir2===true){
                                    setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                                }                            
                                Update();
                            };
                        }else{
                            player_2.move_left()
                            if(!onAir2===true){
                                setRenderState2(player_2.render(7.5, player_2.position_x, player_2.img, "player_2" , "none"));
                            }
                            Update();
                        }}
                    }}
                break;
                // JUMP
                case 'o':
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true && onAir2===false){
                        jumpL(player_2,setRenderState2, setOnAir2, "player_2");
                        checkposition()
                        Update();
                        }
                    }}
                break;
                case 'u':
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true && onAir2===false){
                        jumpR(player_2,setRenderState2, setOnAir2, "player_2");
                        checkposition()
                        Update();
                        }
                    }}
                break;
                // GUARD
                case 'k':   
                if( player_1.lose === player_2.lose ){
                        if(!atackOn2===true && onAir2===false){
                        letguard(player_2, setRenderState2, setGuard2, "player_2" , "none");
                        checkposition()
                        Update();
                        }
                    }
                break;
                // ATTACK
                case 'y': 
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true && onAir2===false){
                            checkposition()
                            if(checkRange(position1,position2)){
                                player_1.fight = false;
                                kick(player_2,setRenderState2, setAtackOn2, "player_2" , "none");
                                if(guard1===false){
                                    player_1.get_dmg(player_2.strength*2);
                                }else if(guard1===true){
                                    player_1.get_dmg(1);
                                }
                                setLifePlayer1(player_1.renderLife())
                                if(player_1.lose === 1){
                                    setTimeout(() => {
                                        if(winPlayer2 === 1){
                                            console.log("primera winPlayer2 ="+winPlayer2)
                                            setwinPlayer2(2)
                                        }else{
                                            console.log("segunda winPlayer2 ="+ winPlayer2)
                                            setwinPlayer2(3)
                                        } 
                                    }, 1000);          
                                }
                                Update();
                            }else{
                                kick(player_2,setRenderState2, setAtackOn2, "player_2" , "none");
                                Update();
                            }
                        }
                    }}
                break;
                case 'h':
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true && onAir2===false){
                            checkposition()
                            if(checkRange(position1,position2)){
                                player_1.fight = false;
                                punch(player_2, setRenderState2, setAtackOn2, "player_2" , "none")
                                if(guard1===false){
                                    player_1.get_dmg(player_2.strength);
                                }else if(guard1===true){
                                    player_1.get_dmg(1);
                                }
                                setLifePlayer1(player_1.renderLife())
                                if(player_1.lose === 1){
                                    setTimeout(() => {
                                        if(winPlayer2 === 1){
                                            console.log("primera winPlayer2 ="+winPlayer2)
                                            setwinPlayer2(2)
                                        }else{
                                            console.log("segunda winPlayer2 ="+ winPlayer2)
                                            setwinPlayer2(3)
                                        } 
                                    }, 1000);        
                                }
                                Update();
                            }else{
                                punch(player_2, setRenderState2, setAtackOn2, "player_2" , "none")
                                Update();
                            }
                        }
                    }}
                break;
                case 'n': 
                    if( player_1.lose === player_2.lose ){
                        if(!guard2 === true){
                        if(!atackOn2===true && onAir2===false){
                            checkposition()
                            if(!player_2.no_mana === true){
                                if(checkSecialRange(position1,position2)){
                                    player_1.fight = false;
                                    soryuken(player_2, setRenderState2, setAtackOn2, "player_2" , "none")
                                    player_2.get_mna(20);
                                    setManaPlayer2(player_2.renderMana())
                                    if(guard1===false){
                                        player_1.get_dmg(player_2.power);
                                    }else if(guard1===true){
                                        player_1.get_dmg(5);
                                    }
                                    setLifePlayer1(player_1.renderLife())
                                    if(player_1.lose === 1){
                                        setTimeout(() => {
                                            if(winPlayer2 === 1){
                                                console.log("primera winPlayer2 ="+winPlayer2)
                                                setwinPlayer2(2)
                                            }else{
                                                console.log("segunda winPlayer2 ="+ winPlayer2)
                                                setwinPlayer2(3)
                                            } 
                                        }, 2000);
                                    }
                                    Update();
                                }else{
                                    player_2.get_mna(20);
                                    setManaPlayer2(player_2.renderMana())
                                    soryuken(player_2, setRenderState2, setAtackOn2, "player_2" , "none")
                                    Update();
                                }
                            }
                        }
                    }}
                break;  
            default: 
                break;
        }});

        window.onkeydown =('keydown',(e)=>{
            switch (e.key){
            case 's':
                    if( player_1.lose === player_2.lose ){        
                        guard(player_1, setRenderState, setGuard1, "player_1" , "none");
                        checkposition()
                        Update();
                    }
                break;
            case 'k':
                    if( player_1.lose === player_2.lose ){
                        guard(player_2, setRenderState2, setGuard2, "player_2" , "none");
                        checkposition()
                        Update();
                    }
                break; 
            default:
                break;
            }});
     
    const winner=()=>{
        if(winPlayer1 === 3){
            player_2.lose = 1;
            return setDeclared(player_1);
        }else if(winPlayer2 === 3){
            player_1.lose = 1;
            return setDeclared(player_2);
        }else{
            player_2.lose = 0;
            player_1.lose= 0;
        }
    }

    const endfirst=()=>{
        player_1.game = true;
        player_2.game = true; 
        player_2.no_mana = false;
        player_1.no_mana= false;
        player_2.lose = 0;
        player_1.lose= 0;
        setRenderState(player_1.render(7.5, 15, player_1.img, "player_1", "none" ));
        setRenderState2(player_2.render(7.5, 15, player_2.img, "player_2", "none"));
        setLifePlayer1(player_1.renderLife("full"));
        setLifePlayer2(player_2.renderLife("full"));

        setManaPlayer1(player_1.renderMana("full"));
        setManaPlayer2(player_2.renderMana("full"));
        checkposition()
         // prarameters
        console.log("player 1 "+winPlayer1);
        console.log("player 2 "+winPlayer2);
        winner()       

        Update();
    }
            
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
                                  
                                   {winPlayer2 === 2 && winPlayer1 ===2 
                                   ?<div className="FinalRound">Final Round</div>
                                   :<>
                                       {winPlayer2 !== winPlayer1
                                        ?<div className="secondNdRound">2nd Round</div>
                                        :<div className="FirstRound" >1st Round</div>
                                        } 
                                   </>
                                   }
                                    
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


export default connect(mapStateToProps)(Fight);
