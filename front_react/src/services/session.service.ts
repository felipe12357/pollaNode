import axios from "axios";
import type { UserLoginDto } from "../dtos/user";
import { ErrorHandlingInterceptor } from "./error-handling.interceptor";

class UserService extends ErrorHandlingInterceptor {

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/user',
    });

    super(axiosInstance);
  }
  
  login = async(data: UserLoginDto): Promise<string> => {
    const response = await this.axiosInstance.get<string>(`/login`,{params:data});
    return response.data;
  }
}

const userService = new UserService();
export default userService;