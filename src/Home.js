import React from "react";

import Button from '@mui/material/Button';
import "./index.css";
import {Aside2} from "./Aside";

const Home = () =>{


    return(
    <div className="home-screen">
      <p className="heading">My Finance APP</p>
     <div className="finance-pics" >
      <img src="./assets/fin_pics_9-removebg-preview.png" alt="fin picS" className="fin-pics"/>
    </div >
        <div className="started-button">
          <Button variant="contained" className="button-up" ><Aside2/></Button>
        </div>
    </div>
    )

}


export default Home