import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";;
import forecastService from "../../services/forecast.service";
import type { MatchForecastDto } from "../../dtos/match";
import countryService from "../../services/country.service";
import type { Country } from "../../dtos/country";

export type ForecastLoaderParams = {
  userId: string;
};

export type ForecastLoaderReturn = {
  matchForeCastList: MatchForecastDto[],
  countryList: Country[]
}

export const ForecastLoader= async ({userId}: ForecastLoaderParams):Promise<ForecastLoaderReturn | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }

  const result = await Promise.all([countryService.getCountries(), forecastService.getByUserId(+userId)]);

  return {
    matchForeCastList: result[1],
    countryList: result[0]
  }
}