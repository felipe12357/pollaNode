import { redirect } from "react-router-dom";
import { ValidationRouteService } from "../../services/validation-route.service";
import forecastService from "../../services/forecast.service";

export type SpyUserLoaderParams = {
  userId: string;
};
export const spyUserLoader = async ({userId}: SpyUserLoaderParams):Promise<unknown | Response>=>{
  if(!ValidationRouteService.validateRoute()) {
    return redirect('../login');
  }

  return await forecastService.getByUserId(Number(userId), true);
}