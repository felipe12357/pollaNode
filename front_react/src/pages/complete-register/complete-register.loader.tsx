import { type LoaderFunctionArgs } from 'react-router-dom';
import type { UserLoginRDto, UserRegisterDto } from '../../dtos/user';
import userService from '../../services/user.service';
import type { AxiosError } from 'axios';

export const CompleteRegisterLoader = async ({ request }: LoaderFunctionArgs):Promise<string | UserLoginRDto>=>{
  const url = new URL(request.url);
  //const username = url.searchParams.get("username");
  const params = Object.fromEntries(url.searchParams) as UserRegisterDto;
  // console.log(params);

  try {
    const result = await userService.completeRegister(params);
    return result;
  } catch (err: unknown) {
    const messages = ((err as AxiosError).response?.data) as { errors: string[] };
    return messages.errors[0] as string;
  };
}