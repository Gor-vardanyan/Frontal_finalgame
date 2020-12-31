import React from 'react';
import './Initialpage.css';
import img from '../../images/blob_kyh7.jpg'
import pickryu from '../../images/Figheters/Ryu/Img/selection_pic.png'
import pickken from '../../images/Figheters/Ken/Img/pickken.png'
import pickakuma from '../../images/Figheters/Akuma/Img/pickakuma.png'
import pickretsu from '../../images/Figheters/Retsu/Img/pickretsu.png'
import pickblanka from '../../images/Figheters/Blanka/Img/pickblanka.png'
import pickchunli from '../../images/Figheters/ChunLi/Img/pickchunli.png'
import pickdashlim from '../../images/Figheters/Dashlim/Img/pickdashlim.png'
import pickzangief from '../../images/Figheters/Zangief/Img/pickdzangief.png'


const Initialpage =()=>{
    
    return(      
        <div className="home2">
            <div className="picker">
                <div className="picksize"><img src={pickryu} alt=""></img></div>
                <div className="picksize"><img src={pickken} alt=""></img></div>
                <div className="picksize"><img src={pickretsu} alt=""></img></div>
                <div className="picksize"><img src={pickchunli} alt=""></img></div>
                <div className="picksize"><img src={pickakuma} alt=""></img></div>
                <div className="picksize"><img src={pickblanka} alt=""></img></div>
                <div className="picksize"><img src={pickdashlim} alt=""></img></div>
                <div className="picksize"><img src={pickzangief} alt=""></img></div>


            </div>
            <div className="contenedor">
                <div className="player1"></div>
                <div className="game"></div>
                <div className="player2"></div>

                <img className="homeimage" src={img} alt=""/>
        </div></div>
    )
};

export default Initialpage;