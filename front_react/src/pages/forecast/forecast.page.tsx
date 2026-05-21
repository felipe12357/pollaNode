import { useLoaderData, useNavigate } from "react-router-dom";
import type  { MatchForecastDto } from "../../dtos/match";
import { useEffect, useState } from "react";
import ForecastListPage from "./components/forecastList/forecast.list.component";
import { FaHome } from "react-icons/fa";
import './forecast.scss'
import type { ForecastLoaderReturn } from "./forecast.loader";

const ForecastPage = () => {
  const navigate = useNavigate();
  const data = useLoaderData() as ForecastLoaderReturn;
  const [matchList, setmatchList] = useState<MatchForecastDto[]>([]);
  
  useEffect(()=>{
    if(data)
      setmatchList(data.matchForeCastList);
  },[data])

  return (
    <div className="forecast-page">
      <div className="forecast-page_menu">
        <button className="button button-primary" onClick={() => navigate('/home')} >
          <FaHome /> Home
        </button>
      </div>
      <ForecastListPage matchList={matchList} countryList={data.countryList} updateList={(e) =>setmatchList(e)} />
    </div>
  )
}

export default ForecastPage