import type { UserLoginDto } from "../../dtos/user";
import userService from "../../services/user.service";

export const loginAction = async({request}: {request: Request})=>{
  const formData =  await request.formData();
  //para q funcione todos los inputs tienen q tener asignada la propiedad name
  const data = Object.fromEntries(formData) as UserLoginDto;

  const result = await userService.login(data);
  const {token, ...userData} = result;
  return userData;
}