import { redirect } from "react-router-dom";
import type { MatchDto } from "../../dtos/match";
import mathService from "../../services/match.service"
import { ValidationRouteService } from "../../services/validation-route.service";

export const AdminLoader= async ():Promise<MatchDto[] | Response>=>{

  if(!ValidationRouteService.validateRouteAdmin()) {
    if(!ValidationRouteService.validateRoute()) {
       return redirect('../login');
    }

    return redirect('../home');
  }
  
  return await mathService.getAll()
}