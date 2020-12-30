import React,{useState} from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
const Login =({ setUser })=>{
    const history = useHistory();

    const handleSubmit = event =>{
        event.preventDefault();
        const loguser = {
            nickname: event.target.nickname.value,
            password: event.target.password.value
        };
        console.log(loguser)
         axios.post('https://finalgamedb.herokuapp.com/login', loguser)
         .then(res => {
             setUser(res.data) //seteo el user como estado del App.js
             localStorage.setItem('authToken', res.data.user.token);
             localStorage.setItem('user', JSON.stringify(res.data.user))
             alert({ message: 'Welcome', description: loguser.nickname })
             setTimeout(() => {
                 history.push('/')
             }, 500);
         })
         .catch(error => { console.log(error); })
    };

   
    const [info, setInfo] = useState(false);    

    const infoseter=()=>{
            setInfo(true)
    }

    return  <div className="centered">
            {info
            ?<div className="login">
                    <h3  className="userlog">USER LOG</h3>
                    <form className="form" onSubmit={handleSubmit} >
                        <input name="nickname" required placeholder="NICKNAME" />
                        <input name="password" type="password" required placeholder="PASSWORD" />
                        <input className="button"  type="submit" value="Submit" />
                    </form>
                    <button className="button">Register</button>
            </div>
            :<button className ="userswitch" onClick={infoseter}>START</button>}    
            </div>
};

export default Login;