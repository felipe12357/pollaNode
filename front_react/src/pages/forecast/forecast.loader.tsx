import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import type { MatchListResponse } from "../../dtos/match";
import forecastService from "../../services/forecast.service";

export const ForecastLoader= async ():Promise<Partial<MatchListResponse> | Response>=>{

  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }
  
  const response = await forecastService.getByUserId(2)
    .then((data)=> ({ data }))
    .catch((error)=>{
      return {error:error.response.data.error};
    });

  return response;
}