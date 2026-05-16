import { useLoaderData, useNavigate } from "react-router-dom";
import type { Results } from "../../../dtos/forecast";
import './resultsList.scss';
import { FaMagnifyingGlass } from "react-icons/fa6";

const ResultsListComponent = () =>{
  const results = useLoaderData() as Results[];
  const navigate = useNavigate();

  return (
    <div className="result-list-component container">
      <div className="result-row header">
        <div>Usuario</div>
        <div>Puntos</div>
      </div>
      {
        results.map(result =>
        <div className="result-row" key={result.username}>
          <FaMagnifyingGlass className="cursor-pointer" onClick={() => navigate(`/spy-user/${result.userId}`)}/>
          <div className="cursor-pointer" onClick={() => navigate(`/spy-user/${result.userId}`)}>
            {result.username}
          </div>
          <div>{result.points}</div>  
        </div>)
      }
    </div>

  )
}
export default ResultsListComponent;