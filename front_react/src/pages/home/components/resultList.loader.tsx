import { redirect } from "react-router-dom";
import type { Results } from "../../../dtos/forecast";
import { ValidationRouteService } from "../../../services/validation-route.service";
import forecastService from "../../../services/forecast.service";

export const ResultListLoader= async ():Promise<Results[] | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }

  return await forecastService.getResults();
}