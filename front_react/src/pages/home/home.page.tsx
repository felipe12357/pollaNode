import { useNavigate } from "react-router-dom";

const HomePage = () =>{
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/admin');
  }


  return (
    <div> Home page  
      <button onClick={() => handleNavigate()} > configure</button>
    </div>
  )
}

export default HomePage;