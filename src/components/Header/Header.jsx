import React, {useState}from 'react'
import { useHistory } from 'react-router-dom'
import './Header.css'
import logo from'../../images/1712205-middle.png'
import fighters from'../../images/fighterswhite.png'
import profile from'../../images/profilewhite.png'
import logOut from'../../images/logoutwhite.png'



const Header = ({setUser}) => {
    const [logout,setLogout] = useState(false)
    const history = useHistory();

    const clicklogout=()=>{
        setUser(null)
        localStorage.clear();
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
        <div className="cont"><img onClick={clickgame} className="logo" src={logo} alt=""/></div> 
         <div className="cont"><img onClick={clickfighters} className="logo" src={fighters} alt=""/></div>
         {logout
         ?<div className="cont"><img onClick={clicklogout} className="logo" src={logOut} alt=""/></div>
         :<div className="cont"><img onClick={clickprofile} className="logo" src={profile} alt=""/></div>
         }
     </div>   
    )
}


export default Header;