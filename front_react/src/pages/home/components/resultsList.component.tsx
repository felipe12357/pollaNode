import { useLoaderData, useNavigate } from "react-router-dom";
import type { Results } from "../../../dtos/forecast";
import './resultsList.scss';
import { FaEye } from "react-icons/fa6";
import { useContextGlobal } from "../../../contextGlobalProvider";

const ResultsListComponent = () =>{
  const results = useLoaderData() as Results[];
  const navigate = useNavigate();
  const { appState: {user} } = useContextGlobal();

  return (
    <div className="result-list-component container">
      <div className="result-row header">
        <div>Usuario</div>
        <div>Puntos</div>
      </div>
      {
        results.map(result =>
        <div className="result-row" key={result.username}>
          <FaEye className="cursor-pointer" onClick={() => navigate(`/spy-user/${result.userId}?name=${result.username}`)}/>
          <div className={`cursor-pointer 
              ${result.userId === user?.id ? 'result-row-own-result' : ''}`
            }
            onClick={() => navigate(`/spy-user/${result.userId}?name=${result.username}`)}>
            {result.username}
          </div>
          <div className={result.userId === user?.id ? 'result-row-own-result' : ''}>
            {result.points}
          </div>  
        </div>)
      }
    </div>

  )
}
export default ResultsListComponent;