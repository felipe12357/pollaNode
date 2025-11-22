import type { MatchDto } from "../../dtos/match";
import mathService from "../../services/match.service"

export const AdminLoader= async ():Promise<{data?: MatchDto[], error?:string}>=>{
  const response = await mathService.getAll()
  .then((data)=> ({ data }))
  .catch((error)=>({ error: error.message }));
  
  return response;
}