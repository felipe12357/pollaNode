import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import forecastService from "../../services/forecast.service";
import countryService from "../../services/country.service";
import type { MatchForecastDto } from "../../dtos/match";
import type { Country } from "../../dtos/country";

export type SpyUserLoaderParams = {
  userId: string;
};
export type SpyLoaderReturn = {
  forecastList: MatchForecastDto[],
  countryList: Country[]
};

export const spyUserLoader = async ({userId}: SpyUserLoaderParams):Promise<unknown | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }

  const result = await Promise.all([countryService.getCountries(), forecastService.getByUserId(+userId), true]);

  return {
    forecastList: result[1],
    countryList: result[0]
  }
}