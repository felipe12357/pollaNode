import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";;
import forecastService from "../../services/forecast.service";
import type { MatchForecastDto } from "../../dtos/match";

export const ForecastLoader= async ():Promise<MatchForecastDto[] | Response>=>{

  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }
  // TODO utilizar el id del usuario
  return await forecastService.getByUserId(2)
}