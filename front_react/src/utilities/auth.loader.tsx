import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../services/validation-route.service";

export const AuthLoader = () =>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }
}