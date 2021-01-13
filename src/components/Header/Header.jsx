import React, {useState}from 'react'
import { useHistory } from 'react-router-dom'
import './Header.css'




const Header = ({setUser}) => {
    const [logout,setLogout] = useState(false)
    const history = useHistory();

    const clicklogout=()=>{
        setUser(null)
        localStorage.clear();        
        history.push('/');
    }

    const clickgame=()=>{
        history.push('/');
        setLogout(false)
    }
    const clickfighters=()=>{
        history.push('/fighters');
        setLogout(false)
    }
    const clickprofile=()=>{
        history.push('/profile');
        setLogout(true)
    }
    return(
     <div className="header" >
        <div className="cont"><img onClick={clickgame} className="logo" src={'Images/fightlogo.png'} alt=""/></div> 
         <div className="cont"><img onClick={clickfighters} className="logo" src={'Images/store.png'} alt=""/></div>
         {logout
         ?<div className="cont"><img onClick={clicklogout} className="logo" src={'Images/logoutwhite.png'} alt=""/></div>
         :<div className="cont"><img onClick={clickprofile} className="logo2" src={'Images/profilewhite.png'} alt=""/></div>
         }
     </div>   
    )
}


export default Header;