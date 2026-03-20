import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";;
import forecastService from "../../services/forecast.service";
import type { MatchForecastDto } from "../../dtos/match";

export type ForecastLoaderParams = {
  userId: string;
};

export const ForecastLoader= async ({userId}: ForecastLoaderParams):Promise<MatchForecastDto[] | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }
  return await forecastService.getByUserId(+userId)
}