import React from 'react';
import './Game.css';
import { useHistory } from 'react-router-dom'

const Game =() =>{
    const history = useHistory();

    const playervsplayer =()=>{
        history.push('/game');
    }
    const playervspc =()=>{
       // history.push('/game');
    }
    const training =()=>{
        //history.push('/game/training');
    }
    return( <div>
        <div className="continer">

                <div className="selectgame">
                    <h2>Select Game</h2>
                    <button onClick={playervspc} style={{color:'gray'}} className="button">Player vs PC</button>
                    <button onClick={playervsplayer} className="button">Player vs Player</button>
                    <button onClick={training} style={{color:'gray'}} className="button">Training</button>
                </div>
                <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
            </div>
                    
    </div>)};
export default Game;