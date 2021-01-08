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
    const [lifePlayer1,setLifePlayer1]=useState(player_1.renderLife())
    const [lifePlayer2,setLifePlayer2]=useState(player_2.renderLife())

    const [atackOn1,setAtackOn1]=useState(true)
    const [atackOn2,setAtackOn2]=useState(true)

    const [winner, setWinner] = useState(false);

    const checkposition=()=>{
    let position =(player_1.getPositionPercentage()+player_2.getPositionPercentage() - 100);
       if(position > 0){
           player_1.flip = true;
           player_2.flip = true;

       } else{
        player_1.flip = false;
        player_2.flip = false;
       }
    }

     const checkRange = (pos_player1, pos_player2) =>{
         var calc = ((pos_player1 + pos_player2) - 100);
         console.log("posicion 1"+pos_player1)
         console.log("posicion 2"+pos_player2)
         console.log("interacion de pos"+calc)

         return ( calc > -10 && calc < 10)
     };

    const Update = useUpdate();
    window.onkeyup=('keyup',(e)=>{
        let position1 = player_1.getPositionPercentage();
        let position2 = player_2.getPositionPercentage();

            switch (e.key){
                case 'a':
                    if(player_1.flip===true){
                        if(!checkRange(position1,position2)){
                            player_1.move_left()
                            setRenderState(player_1.renderPlayer());
                            Update();
                        }else{
                            setRenderState(player_1.renderPlayer());
                            Update();
                        };
                    }else{
                        player_1.move_left()
                        setRenderState(player_1.renderPlayer());
                        Update();
                    }
                    
                break;   
                case 'd':
                    if(player_1.flip===false){
                        if(!checkRange(position1,position2)){
                            player_1.move_right();
                            setRenderState(player_1.renderPlayer());
                            Update();
                        }else{
                            setRenderState(player_1.renderPlayer());
                            Update();
                        };
                    }else{
                        player_1.move_right();
                        setRenderState(player_1.renderPlayer());
                        Update();
                    }               

                break;
                case 'e':
                    setRenderState(player_1.renderPlayer("e"));
                    player_1.jumpRight();
                    setTimeout(()=>{
                        setRenderState(player_1.renderPlayer());
                        checkposition()
                    },1000)
                    Update();
                break;
                case 'q':
                    setRenderState(player_1.renderPlayer("q"));
                    setTimeout(()=>{
                        player_1.jumpLeft()
                        checkposition()
                        setRenderState(player_1.renderPlayer());
                        },1000)
                        Update();
                    
                break;
                case 'f':
                    if(atackOn1 === true){
                        setRenderState(player_1.renderPlayer("f"));
                        player_1.isAtacking(true);
                    }
                    if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                        player_2.get_dmg(player_1.strength);
                        setLifePlayer2(player_2.renderLife())
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
                        player_2.move_right();
                        setRenderState2(player_2.renderPlayer());
                        Update();

                break;
                case 'l':
                    player_2.move_left();
                    setRenderState2(player_2.renderPlayer());
                    Update();

                break;
                case 'h':
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

        
    const RenderGame=()=>{
        return(<div>
                    {winner
                        ?<div></div>
                        :<div className="fighter">
                            <div className="life">
                            {player_1
                            ?<div className="lifespawn">
                                {player_1.name}{lifePlayer1}
                            </div>
                            :<div></div>
                            } 
                                <img className="vs" src="/images/vs.png" alt=""/>
                                {player_2
                            ?<div className="lifespawn">
                                {player_2.name}{lifePlayer2}
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
                                <img className="imgstadium" src={'/Images/background3.jpg'} alt=""/>
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
