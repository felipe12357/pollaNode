import { useNavigate } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import { useEffect } from "react";
import { useContextGlobal } from "../../contextGlobalProvider";

const HomePage = () =>{
  const navigate = useNavigate();
  const {appState: {user}} = useContextGlobal();
 
  useEffect(()=>{
    if(!ValidationRouteService.validateRoute()) {
        navigate('/login')
      }
  },[])

  return (
    <div> Home page  
      <button onClick={() =>navigate('/admin')} > Admin</button>
      <button onClick={() =>navigate(`/forecast/${user!.id}`)} > Pronosticos</button>
    </div>
  )
}

export default HomePage;