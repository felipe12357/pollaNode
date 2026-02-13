import axios from "axios";
import type { UserLoginDto, UserLoginRDto } from "../dtos/user";
import { ErrorHandlingInterceptor } from "./error-handling.interceptor";

class UserService extends ErrorHandlingInterceptor {

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user',
    });

    super(axiosInstance);
  }
  
  login = async(data: UserLoginDto): Promise<UserLoginRDto> => {
    const response = await this.axiosInstance.get<UserLoginRDto>(`/login`,{params:data});

    sessionStorage.setItem('user-token', response.data.token);
    sessionStorage.setItem('user-role', response.data.role);
    return response.data;
  }
}


const userService = new UserService();
export default userService;