import React from 'react' 
import './Register.css'
import axios from 'axios';

const Register = ({setReg}) => {

    const back=()=>{setReg(false)}

    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        axios.post('https://finalgamedb.herokuapp.com/register', {
            nickname: event.target.nickname.value,
            email: event.target.email.value,
            password: event.target.password.value,
        })
        .then(res => {
            alert('Account created succesfully')
            setTimeout(() => { 
                setReg(false)               
                }, 500);
        })
        .catch(error => { alert("user already exists"); console.log(process.env); })
    };

    return (<div className="login2">
                <h3 className="userlog">USER Register</h3>
                <form className="centered" onSubmit={handleSubmit} >
                    <input name="nickname" required placeholder="Nickname"/>
                    <input name="email" required placeholder="Email"/>
                    <input name="password" type="password" required placeholder="Password"/>
                    <input className="button" type="submit" value="Register" />
                </form>
                <button className="button" onClick={back}>back</button>
            </div>
    )
};
export default Register;