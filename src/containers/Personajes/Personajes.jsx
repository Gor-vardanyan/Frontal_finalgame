import React from 'react'

class Personajes extends React.Component {
    constructor (item){
        super(item);
        this.name = item.name;
        this.value = item.value;
        this.img = '/images/Figheters/'+item.name+'/Pose/'+item.name+'.gif'
        this.health = item.health;
        this.mana = item.mana;
        this.strength = item.strength;
        this.power = item.power;
        this.power = item.power;
        this.playerfixed = 1;
        this.position_x = 0;
        this.boundries = {
            min: 0,
            max: 75
        }
        this.position_y = 0;

    }
    getCurrentHealth(){
        return this.health;
    }

    getHealthPercentage(){
        return (this.health*this.max_health)/100;
    }

    getPositionPercentage(){
       return (this.position_x*100)/this.boundries.max;
    }

    get_dmg(num){
        this.health -= num;
        if((this.health*this.max_health)/100 === 0){
        }
    }

    move_right(){
        console.log("d")
        if(this.position_x < this.boundries.max){
            this.position_x += 5;
        }
    }

    move_left(){
        console.log("a")

        if(this.position_x > this.boundries.min){
            this.position_x -= 5;
        }
    }

    move_up(){

    }
    move_bottom(){

    }

    renderStats(clase = false){
        return(<div>
            <h2>{this.name}</h2>
            <p>Health:{this.health}</p>
            <p>Mana:{this.mana}</p>
            <p>Strength:{this.strength}</p>
            <p>Power:{this.power}</p>
            <p>{this.description}</p>
            {clase
            ?<div></div>
            :<button onClick={ () => this.playerfixed++ }>Pick</button>
            }
            </div>);
    }
    renderPlayer(target){
        var pos = this.position_x;
        if(target === "PC"){
            var direction = "right";
        }
        else{
            var direction = "left";
        }
        return (<div style={{direction}+":"+{pos}+"vw"} id={target}>
                <img className="charactersize" src={this.img} alt=""/>
                </div>);
    }
    renderPlayer2(target){
        var pos = this.position_x;
        if(target === "PC"){
            var direction = "right";
        }
        else{
            var direction = "left";
        }
        return (<div style={{direction}+":"+{pos}+"vw"} id={target}>
        <img className="charactersize" src={this.img} alt=""/>
        </div>);
    }

    renderLife(player){
        document.getElementById(`${player}_life`).style.width = `${this.getHealthPercentage()}%`;
    }
}

export default Personajes;