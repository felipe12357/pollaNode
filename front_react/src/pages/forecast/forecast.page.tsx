import { useLoaderData } from "react-router-dom";
import type { MatchListResponse } from "../../dtos/match";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ForecastPage = () => {
  const {data, error: loadingError} = useLoaderData() as MatchListResponse;

  useEffect(() => {
    if(loadingError) 
      toast.error(`Error loading matches: ${loadingError}`);
  }, [loadingError]);

  return (
    <div className="forecast-page">
      { data?.map((match) => <div> {match.id} </div> ) }
    </div>
  )
}

export default ForecastPage