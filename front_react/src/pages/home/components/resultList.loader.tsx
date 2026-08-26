import type { Results } from "../../../dtos/forecast";
import forecastService from "../../../services/forecast.service";

export const ResultListLoader= async ():Promise<Results[] | Response>=>{
  return await forecastService.getResults();
}