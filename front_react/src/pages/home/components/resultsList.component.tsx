import { useLoaderData } from "react-router-dom";
import type { Results } from "../../../dtos/forecast";
import './resultsList.scss';

const ResultsListComponent = () =>{
  const results = useLoaderData() as Results[];
  return (
    <div className="result-list-component container">
      <div className="result-row header">
        <div>Usuario</div>
        <div>Puntos</div>
      </div>
      {
        results.map(result =>
        <div className="result-row">
          <div>{result.username}</div>
          <div>{result.points}</div>  
        </div>)
      }
    </div>

  )
}
export default ResultsListComponent;