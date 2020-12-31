import React,{useState} from 'react' 
import './Register.css'
import { useHistory } from 'react-router-dom'
import axios from 'axios';

const Register = ({setReg, setUser}) => {
    const [newUser, setNewUser] = useState({});

    const history = useHistory({});
    const back=()=>{setReg(false)}

    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        axios.post('https://finalgamedb.herokuapp.com/register', {
            nickname: event.target.nickname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        })
        .then(res => {
            setNewUser(res.data.user);
            alert('Account created succesfully')
            setTimeout(() => { 
                setReg(false)               
                }, 500);
        })
        .catch(error => { alert("user already exists"); console.log(process.env); })
    };

    return (<div className="login">
                <h3 className="userlog">USER Register</h3>
                <form className="centered" onSubmit={handleSubmit} >
                    <input name="nickname" required placeholder="Nickname"/>
                    <input name="email" required placeholder="Email"/>
                    <input name="password" type="password" required placeholder="Password"/>
                    <input type="submit" value="Register" />
                </form>
                <button className="button" onClick={back}>back</button>
            </div>
    )
};
export default Register;