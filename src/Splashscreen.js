import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Splashscreen = () =>{
  
  const navigation = useNavigate();

useEffect(()=>{
   const timer = setTimeout(() =>{
    const userInput = localStorage.getItem("username");
   
    navigation('/home')
    if (userInput) {
      navigation('/dashboard');
    }
  }, 5000);

return () => clearTimeout(timer)
}, [navigation])

return(
    <div className="splash-screen">
      <p className="app-splash"> My Finance App</p>
      <BeatLoader  color ="white" size={14} margin={5}/>
    </div>
)
}

export default Splashscreen;