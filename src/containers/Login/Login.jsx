import React,{useState} from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Register from '../Register/Register';

const Login =({ setUser })=>{
    const history = useHistory();
    const [info, setInfo] = useState(false);    
    const infoseter=()=>{setInfo(true)}
    
    const [reg, setReg] = useState(false);    
    const registration=()=>{setReg(true)}

    const handleSubmit = event =>{
        event.preventDefault();
        const loguser = {
            nickname: event.target.nickname.value,
            password: event.target.password.value
        };
        console.log(loguser)
         axios.post('https://finalgamedb.herokuapp.com/login', loguser)
         .then(res => {
             setUser(res.data.user) //seteo el user como estado del App.js
             localStorage.setItem('authToken', res.data.user.token);
             localStorage.setItem('user', JSON.stringify(res.data.user))
             alert("Welcome back" )
             setTimeout(() => {
                 history.push('/')
             }, 500);
         })
         .catch(error => { console.log(error); })
    };

    return  <div className="centered">
            {info
            ?<div>
                {reg
                ?<Register setReg={setReg} setUser={setUser}></Register>
                :<div className="login">
                <h3  className="userlog">USER LOG</h3>
                <form className="form" onSubmit={handleSubmit} >
                    <input name="nickname" required placeholder="Nickname" />
                    <input name="password" type="password" required placeholder="Password" />
                    <input className="button"  type="submit" value="Login" />
                </form>
                <button className="button" onClick={registration}>Register</button>
                </div>}</div>
            :<button className ="userswitch" onClick={infoseter}>START</button>}    
            </div>
};

export default Login;