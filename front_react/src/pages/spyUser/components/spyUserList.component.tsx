import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { formatDate } from "../../../utilities/date.handling";
import './spyUserList.scss';
import { useTableScrollDate } from "../../../hooks/useTableScrollDate";
import ReactCountryFlag from "react-country-flag";
import type { SpyLoaderReturn } from "../spyUser.loader";

const SpyUserListComponent = () =>{
  const { forecastList, countryList } = useLoaderData() as SpyLoaderReturn;
  const { setRef, scroll } = useTableScrollDate();

  useEffect(() => {
    if(forecastList.length > 0) {
      const today = new Date();
      scroll(today, forecastList, 1);
    }
  },[forecastList]);

  const getCountryCode = (countryName: string): string => {
    return countryList.find((country) => country.name === countryName)?.code || 'Error';
  }

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
              <div> 
                <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team1)} svg />
                <span className="match-row-score"> {match.foreCast} </span>
                <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team2)} svg />
              </div>
              <div> {match.result} </div>
              <div> {match.points}</div>
            </div>
          )}
    </div>

  )
}
export default SpyUserListComponent;