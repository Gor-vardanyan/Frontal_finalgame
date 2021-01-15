import React, { useEffect , useState} from 'react';
import './Admin.css';
import axios from 'axios';

const Admin =() =>{
    const [Display, setDisplay] = useState([{}])

    useEffect(() => {
        let token = localStorage.getItem("authToken");
        let data = JSON.stringify({"nickname":"admin","password":"admin1234"});
        let config = {
          method: 'post',
          url: 'https://finalgamedb.herokuapp.com/admin/user/show',
          headers: { 
            'Authorization': 'Bearer '+ token, 
            'Content-Type': 'application/json'
          },
          data : data
        };        
        axios(config).then((res)=>{
            setDisplay(res.data)
        })
    }, [])

    const deleteUser=(item)=>{
        console.log("delete user")
    }

    return( <div>
        <div className="continer">
            <div className="selectgame">

                    <h2>Users</h2>
                <div className="selectgame2">
                    {Display.map((item)=>{return (<div>
                        <h2>{item.nickname}</h2>
                        <p>Email: {item.email}</p>
                        <p>Players: {item.players?.map((vit)=>{ return <div>{vit}</div>})}</p>
                        <p>Credits: {item.credit} 
                        <img style={{ width: "20px"}} src="/Images/goldCoin.gif" alt=""/></p>
                        <button onClick={()=> deleteUser(item)}></button>
                        </div>)})}
                </div></div>
                <img className="homeimage" src={'/Images/background.jpg'} alt=""/>
            </div>
                    
    </div>)};
export default Admin;