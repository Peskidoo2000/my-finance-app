import React, {useState} from "react";
import {Aside3} from "./Aside";

const GetStarted = ()=>{
    const  [username, setUsername] = useState("");

    const handleEvent = (event)=>{
        const newValue = event.target.value;
        setUsername(newValue);
        localStorage.setItem('username', newValue)
        console.log(newValue)
    }
    
    return(
        <div className="form-holder">
        <form className="form">
    
    <h1 className="h3 mb-3 fw-normal" style={{color:"white"}}> Enter a Username</h1>
    

    <div className="form-floating">
      <input type="text" 
      className="form-control" 
      id="floatingInput" placeholder="Username"
       onChange={handleEvent}
        value={username}
        required
        />
      <label htmlFor="floatingInput">Username</label> 
    </div>
    <p className="mt-5 mb-3 text-secondary" style={{color:"white"}}>This username will appear on your dashboard for refrences</p>
    <button className="btn btn-primary w-100 py-2" type="submit"><Aside3/></button>

  </form>
 
        </div>
    )
}
export default GetStarted