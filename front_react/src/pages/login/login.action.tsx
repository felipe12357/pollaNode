import type { AxiosError } from "axios";
import type { UserLoginDto } from "../../dtos/user";
import userService from "../../services/user.service";

export const loginAction = async({request}: {request: Request})=>{
  const formData =  await request.formData();
  //para q funcione todos los inputs tienen q tener asignada la propiedad name
  const data = Object.fromEntries(formData) as UserLoginDto;

  try {
    const result = await userService.login(data);
    const {token, ...userData} = result;
    return userData;
  } catch (err: unknown) {
    const messages = ((err as AxiosError).response?.data) as { errors: string[] };
    return messages.errors[0] as string;
  };

}