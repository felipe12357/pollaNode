import { useState } from "react";
import type { MatchForecastDto } from "../../../../dtos/match";
import './forecast.list.scss';
import { FaCheck, FaPen } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import forecastService from "../../../../services/forecast.service";

interface MatchListProps {
  matchList:MatchForecastDto[]
  updateList:(val: MatchForecastDto[])=>void,
};

const ForecastListPage:React.FC<MatchListProps> = ({matchList, updateList}) => {
  const [selectedMatchID, setMatchId] = useState<number | null>();
  const [forecastInput, setForecastInput] = useState<string>('');

  const updateForecastResult = async()=> {

    const response = await forecastService.updateForecast(2,selectedMatchID!, forecastInput);

    if(response) {
      const position = matchList.findIndex((match) => selectedMatchID === match.id);
      matchList[position] = {...matchList[position], foreCast:response.forecast };
      updateList(matchList);
    }

    setMatchId(null);
  }
 
  return <div className="forecast-list-component container">
      <div className="match-row header">
          <div className="match-row_header-match"> Partido </div>
          <div> Fecha </div>
          <div> Pronostico </div>
          {
            !selectedMatchID && <>
              <div> Resultado </div>
              <div> Puntos </div>
            </>
          }

      </div>
    { matchList?.map((match) => 
      <div className="match-row" key={match.id}>
        <div> {match.team1} </div>
        <div> vs </div>
        <div> {match.team2} </div>
        <div> {match.date} </div>
        <div>
          { selectedMatchID === match.id 
            ? <input type="text" onChange={(e)=>setForecastInput(e.target.value)}></input>
            : <>  
              {match.foreCast}
              { new Date() < new Date(match.date) && <FaPen className="update-icon" onClick={()=>setMatchId(match.id as number)} /> }
            </>
          } 
        </div>
        {
          selectedMatchID === match.id && <div >
            <FaCheck className="confirm-icon" onClick={()=>updateForecastResult()}/>
            <FaXmark className="cancel-icon" onClick={()=>setMatchId(null)}/>
          </div>
        }
        {
          !selectedMatchID && <> 
          <div> {match.result} </div>
          <div> {match.points}</div></>
        }
      </div>
    )}
  </div>
}

export default ForecastListPage;