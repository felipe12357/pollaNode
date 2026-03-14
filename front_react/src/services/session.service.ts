import axios from "axios";
import type { UserLoginDto, UserLoginRDto } from "../dtos/user";
import { AxiosHandlingInterceptor } from "./axios-handling.interceptor";

class UserService extends AxiosHandlingInterceptor {

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user',
    });

    super(axiosInstance);
  }
  
  login = async(data: UserLoginDto): Promise<UserLoginRDto> => {
    const response = await this.axiosInstance.get<UserLoginRDto>(`/login`,{params:data});
    sessionStorage.setItem('user-data',JSON.stringify(response.data));
    return response.data;
  }
}


const userService = new UserService();
export default userService;