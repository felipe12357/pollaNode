import { redirect } from "react-router-dom";
import type { MatchDto } from "../../dtos/match";
import mathService from "../../services/match.service"
import { ValidationRouteService } from "../../services/validation-route.service";
import countryService from "../../services/country.service";
import type { Country } from "../../dtos/country";


export type AdminLoaderReturn = {
  matchList: MatchDto[],
  countryList: Country[]
}
export const AdminLoader= async ():Promise<AdminLoaderReturn | Response>=>{

  if(!ValidationRouteService.validateRouteAdmin()) {
    if(!ValidationRouteService.validateRoute()) {
       return redirect('../login');
    }

    return redirect('../home');
  }
  const result = await Promise.all([countryService.getCountries(), mathService.getAll()]);

  return {
    matchList: result[1],
    countryList: result[0]
  }
}