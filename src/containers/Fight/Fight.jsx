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

     const checkRange = (pos_player1, pos_player2) =>{
         var calc = ((pos_player1 + pos_player2) - 100);
         console.log(pos_player1)
         console.log(pos_player2)

         return ( calc > -10 && calc < 10)
     }
    const Update = useUpdate();
    window.onkeyup=('keyup',(e)=>{
            switch (e.key){
                case 'a':
                    player_1.move_left()
                    setRenderState(player_1.renderPlayer());
                    Update();
                    
                break;   
                case 'd':
                    player_1.move_right();
                    setRenderState(player_1.renderPlayer());
                    Update();

                break;
                case 'f':
                    if(atackOn1 === true){
                        setRenderState(player_1.renderPlayer("f"));
                        player_1.isAtacking(true);
                    }
                    if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                        setLifePlayer2(player_2.get_dmg(player_1.strength));
                        Update();
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
                        setLifePlayer1(player_1.get_dmg(player_2.strength));
                        Update();
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
            return(
                <div className="fighter">
                    <div className="life">
                       {player_1
                       ?<div>
                           {lifePlayer1}
                       </div>
                       :<div></div>
                       } 
                        <img className="vs" src="/images/vs.png" alt=""/>
                        {player_2
                       ?<div>
                           {lifePlayer2}
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
                    </div>    
                    <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
                </div>)
        }
        return RenderGame()
}

export default connect(mapStateToProps)(Fight);
