import React, { useState, useEffect } from 'react'
import './Fight.css'
import { connect } from 'react-redux';

var player_1= {}
var player_2= {}

const mapStateToProps = (state)=> {
    player_1 = state.player_1;
    player_2 = state.player_2
    console.log(state)
}


const Fight =()=>{

  const [right, setRight] = useState(0);
  const [left, setleft] = useState(0);

  useEffect(() => {
      player_1.move_right();

    console.log(`applied right${right}`);
  }, [right]);

  useEffect(() => {
    player_1.move_left();
    console.log(`applied left${right}`);

  }, [left]);

    document.addEventListener('keydown',(e)=>{
        switch (e.key){
        case 'd':
                //loop problem

            setRight(right + 1)
            console.log(`The changed: right${left}`);

            break;
        case 'a':
                  //loop problem

            setleft(left + 1)
            console.log(`The changed: left${left}`);

            break;   
        default: console.log("none")
            break;
    }});
    return(
        <div className="fighter">
                        <div className="stadium">
                            {player_1
                                ?<div>{player_1.renderPlayer()}</div>
                                :<div></div>
                            }
                            {player_2
                                ?<img className="player_size flip" src={player_2.img} alt=""/>
                                :<div></div>
                            }
                        </div>    
            <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
        </div>)
}

export default connect(mapStateToProps)(Fight);
