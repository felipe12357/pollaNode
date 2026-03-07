import { useLoaderData, useNavigate } from "react-router-dom";
import type { MatchForecastDto, MatchForecastListResponse } from "../../dtos/match";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ForecastListPage from "./components/forecastList/forecast.list.component";
import { FaHome } from "react-icons/fa";
import './forecast.scss'

const ForecastPage = () => {
  const navigate = useNavigate();
  const {data, error: loadingError} = useLoaderData() as MatchForecastListResponse;
  const [matchList, setmatchList] = useState<MatchForecastDto[]>([]);
  
  useEffect(() => {
    if(loadingError) 
      toast.error(`Error loading matches: ${loadingError}`);
  }, [loadingError]);

  useEffect(()=>{
    if(data)
      setmatchList(data);
  },[data])

  return (
    <div className="forecast-page">
      <div className="forecast-page_menu">
        <button className="button button-primary" onClick={() => navigate('/home')} >
          <FaHome /> Home
        </button>
      </div>
      <ForecastListPage matchList={matchList} updateList={(e) =>setmatchList(e)} />
    </div>
  )
}

export default ForecastPage