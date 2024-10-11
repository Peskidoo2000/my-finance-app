import React, {useEffect, useState} from "react";
import { BrowserRouter as Router,  Routes, Route, useLocation, } from 'react-router-dom';
import './index.css';
import Dashboard from "./Dashboard"; 
import Splashscreen from "./Splashscreen";
import Home from "./Home";
import GetStarted from "./GetStarted";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {Aside} from "./Aside";
import Budgetsavings from "./Budgetsavings";
import Income from "./Income";
import Expenses from "./Expenses";
import Financereport from "./Financereport";



function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  const names = name.split(' ');
  const initials = names.length > 1
    ? `${names[0][0]}${names[1][0]}`
    : `${names[0][0]}`; 
  
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials.toUpperCase(),
  };
}
function App() {
  
   return (  
    <Router>
      <Main/>
      
      </Router>
   
  );
}

function Main(){
  const [appgreet, setAppgret] = useState("")
  const today = new Date();
  const todayTime = today.getHours();
  const location = useLocation();
  const hideHeader =['/getStarted', '/', '/home'];
  const userInput = localStorage.getItem('username') || "No name";

  

  const greeting =() =>{
    if (todayTime <= 11){
      setAppgret("Good Morning")
    } else if(todayTime >= 12  && todayTime <= 15){
      setAppgret("Good Afernoon")
    } else{
      setAppgret("Good Evening")
    }
  }

  useEffect (()=>{
    greeting ();

    const collapseNav = document.getElementById("navbarsExample03");
    const collapseNavIns = window.bootstrap.Collapse.getInstance(collapseNav);
    

    if(collapseNavIns){
      collapseNavIns.hide();
    } 
    
    
}, [location]);

  
 
  return (
     <div className="app-main ">
      {!hideHeader.includes(location.pathname) &&
           <nav className="navbar navbar-expand-md navbar-dark bg-dark app-header">
           <div className="container-fluid">
           <Stack direction="row" spacing={2}>
             <Avatar className="avatar" {...stringAvatar(userInput)} />
             <span className="sub-header"> {appgreet}, {userInput} </span>
           </Stack>
             <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="navbar-collapse collapse" id="navbarsExample03">
             <Aside location ={location}/> 
             </div>
           </div>
         </nav>
       
  }

      <main>
      <Routes> 
        <Route path="/" element={<Splashscreen/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/getStarted" element={<GetStarted/>}/>
        <Route path="/home/*" element={<Home/>}/>
        <Route path="/income" element={<Income/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/budgetsavings" element={<Budgetsavings/>}/>
        <Route path="/financereport" element={<Financereport/>}/>
      </Routes>
      </main>
    </div>
  )
}

export default App;
