import { redirect } from "react-router-dom";
import type { MatchListResponse } from "../../dtos/match";
import mathService from "../../services/match.service"
import { ValidationRouteService } from "../../services/validation-route.service";

export const AdminLoader= async ():Promise<Partial<MatchListResponse> | Response>=>{

  if(!ValidationRouteService.validateRouteAdmin()) {
    if(!ValidationRouteService.validateRoute()) {
       return redirect('../login');
    }

    return redirect('../home');
  }
  
  
  const response = await mathService.getAll()
    .then((data)=> ({ data }))
    .catch((error)=>({ error: error.message }));
    
  return response;
}