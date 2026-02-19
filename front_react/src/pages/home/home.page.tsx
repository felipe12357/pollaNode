import { useNavigate } from "react-router-dom";

const HomePage = () =>{
  const navigate = useNavigate();


  return (
    <div> Home page  
      <button onClick={() =>navigate('/admin')} > Admin</button>
       <button onClick={() =>navigate('/forecast')} > Pronosticos</button>
    </div>
  )
}

export default HomePage;