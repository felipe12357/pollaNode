import { useNavigate } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import { useEffect } from "react";

const HomePage = () =>{
  const navigate = useNavigate();
 
  useEffect(()=>{
    if(!ValidationRouteService.validateRoute()) {
        navigate('/login')
      }
  },[])

  return (
    <div> Home page  
      <button onClick={() =>navigate('/admin')} > Admin</button>
       <button onClick={() =>navigate('/forecast')} > Pronosticos</button>
    </div>
  )
}

export default HomePage;