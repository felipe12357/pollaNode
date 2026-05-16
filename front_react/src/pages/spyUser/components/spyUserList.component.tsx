import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../../../utilities/date.handling";
import type { MatchForecastDto } from "../../../dtos/match";
import './spyUserList.scss';
import { useTableScrollDate } from "../../../hooks/useTableScrollDate";

const SpyUserListComponent = () =>{
  const forecastList = useLoaderData() as MatchForecastDto[];
  const { setRef, scroll } = useTableScrollDate();

  useEffect(() => {
    if(forecastList.length > 0) {
      const today = new Date();
      scroll(today, forecastList, 2);
    }
  },[forecastList]);

  return (
    <div className="spy-user-list-component container">
            <div className="match-row header">
                <div> Fecha </div>
                <div className="match-row_header-match"> Partido </div>
                <div> Pronostico </div>
                <div> Resultado </div>
                <div> Puntos </div>
            </div>
          { forecastList?.map((match) => 
            <div className="match-row" key={match.id} ref={(element) => { if (element) setRef(element) }}>
              <div> {formatDate(match.date)} </div>
              <div> { match.team1 } </div>
              <div> vs </div>
              <div> { match.team2} </div>
              <div> {match.foreCast} </div>
              <div> {match.result} </div>
              <div> {match.points}</div>
            </div>
          )}
    </div>

  )
}
export default SpyUserListComponent;