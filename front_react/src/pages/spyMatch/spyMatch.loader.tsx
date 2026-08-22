import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import forecastService from "../../services/forecast.service";
import countryService from "../../services/country.service";
import type { MatchForecast } from "../../dtos/match";

export type SpyMatchParams = {
  matchId: string;
};
export type SpyMatchReturn = {
  matchForecast: MatchForecast,
};

export const spyMatchLoader = async ({matchId}: SpyMatchParams):Promise<SpyMatchReturn | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }

  const result = await Promise.all([countryService.getCountries(), forecastService.getByMatchId(+matchId), true]);

  return {
    matchForecast: result[1],
  }
}