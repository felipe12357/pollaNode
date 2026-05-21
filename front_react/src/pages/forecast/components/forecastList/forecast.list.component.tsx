import { useEffect, useState } from "react";
import type { MatchForecastDto } from "../../../../dtos/match";
import './forecast.list.scss';
import { FaCheck, FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import forecastService from "../../../../services/forecast.service";
import { useContextGlobal } from "../../../../contextGlobalProvider";
import { useTableScrollDate } from "../../../../hooks/useTableScrollDate";
import { formatDate } from "../../../../utilities/date.handling";
import ReactCountryFlag from "react-country-flag";
import type { Country } from "../../../../dtos/country";


interface MatchListProps {
  matchList:MatchForecastDto[],
  countryList: Country[],
  updateList:(val: MatchForecastDto[])=>void,
};

const ForecastListPage:React.FC<MatchListProps> = ({matchList, updateList, countryList}) => {
  const [selectedMatchID, setMatchId] = useState<number | null>();
  const [forecastInput1, setForecastInput1] = useState<number>();
  const [forecastInput2, setForecastInput2] = useState<number>();
  const {appState: {user}} = useContextGlobal();
  const { setRef, scroll } = useTableScrollDate();

  useEffect(() => {
    if(matchList.length > 0) {
      const today = new Date();
      scroll(today, matchList, 1);
    }
  },[matchList]);

  const updateForecastResult = async()=> {
    const response = await forecastService.updateForecast(user!.id,selectedMatchID!, `${forecastInput1}-${forecastInput2}`);

    if(response) {
      const position = matchList.findIndex((match) => selectedMatchID === match.id);
      matchList[position] = {...matchList[position], foreCast:response.forecast };
      updateList(matchList);
    }

    setMatchId(null);
  }

  const canUpdateMatch = (date: Date): boolean => {
    const eventTime = date.getTime();
    const oneHourBefore = eventTime - 3600000;

    return Date.now() < oneHourBefore;
  }

  const getCountryCode = (countryName: string): string => {
    return countryList.find((country) => country.name === countryName)?.code || 'Error';
  }
 
  return <div className="forecast-list-component container">
      <div className="match-row header">
          <div> Fecha </div>
          <div className="match-row_header-match"> Partido </div>
          <div> Pronostico </div>
          <div> Acciones </div>
          <div> Resultado </div>
          <div> Puntos </div>
      </div>
    { matchList?.map((match) => 
      <div className="match-row" key={match.id} ref={
        (element) => {
          if (element) setRef(element)
        }}
      >
        <div> {formatDate(match.date)} </div>
        <div> {match.team1} </div>
        <div> vs </div>
        <div> {match.team2} </div>
        <div>
          <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team1)} svg />
          <span className="match-row-score">
            {selectedMatchID === match.id 
              ? <>
                <input type="text" onChange={(e)=>setForecastInput1(+e.target.value)} defaultValue={match.foreCast?.split('-')[0]}></input>
                -
                <input type="text"  onChange={(e)=>setForecastInput2(+e.target.value)} defaultValue={match.foreCast?.split('-')[1]}></input>
               </>
              : match.foreCast}
          </span>

          <ReactCountryFlag className="flag" countryCode={getCountryCode(match.team2)} svg />
        </div>
          { selectedMatchID === match.id 
            ? <div className="icon-options"> 
              <FaCheck className="confirm-icon" onClick={()=>updateForecastResult()}/>
              <FaXmark className="cancel-icon" onClick={()=>setMatchId(null)}/>
              </div>
            : <div> 
               { canUpdateMatch(match.date) && <FaPen className="update-icon" onClick={()=>setMatchId(match.id as number)} /> }
              </div>
          } 
        <div> {match.result} </div>
        <div> {match.points}</div>
      </div>
    )}
  </div>
}

export default ForecastListPage;