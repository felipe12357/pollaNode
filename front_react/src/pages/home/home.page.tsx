import { useNavigate } from "react-router-dom";
import { useContextGlobal } from "../../contextGlobalProvider";
import { UserRole } from "../../dtos/user";
import ResultsListComponent from "./components/resultsList.component";

const HomePage = () =>{
  const navigate = useNavigate();
  const {appState: {user}} = useContextGlobal();
 
  return (<>
    <div>
      { user?.role === UserRole.ADMIN && <button onClick={() =>navigate('/admin')} > Admin</button> }
      <button onClick={() =>navigate(`/forecast/${user!.id}`)} > Pronosticos</button>
    </div>
     <ResultsListComponent/>
  </>)
}

export default HomePage;