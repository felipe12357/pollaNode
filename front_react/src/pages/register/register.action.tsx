import type { UserRegisterDto } from "../../dtos/user";
import userService from "../../services/user.service";

export const registerAction = async({request}: {request: Request})=>{
  const formData =  await request.formData();
  //para q funcione todos los inputs tienen q tener asignada la propiedad name
  const data = Object.fromEntries(formData) as UserRegisterDto;

  try {
    const result = await userService.register(data);

    return result;
  } catch (err) {
    return err;
  }
}