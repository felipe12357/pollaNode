import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import globalNavigation from "../utilities/navigation";
import type { UserLoginRDto } from "../dtos/user";

export class AxiosHandlingInterceptor {

  protected axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.addToken();
    this.handleError();
  }

  private addToken() {
    this.axiosInstance.interceptors.request.use(
      config => {
        const sessionUserDataString = sessionStorage.getItem('user-data');
        if(sessionUserDataString) {
          const sessionUserData = JSON.parse(sessionUserDataString) as UserLoginRDto;
          config.headers.Authorization = `Bearer ${sessionUserData.token}`;
        }

        return config;
      }
    );
  }

  private handleError() {
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        let errort = "Unknown error";

        if (error.response)
          errort = error.response?.data.error || error.response?.data?.errors[0];
        else if (error.request)
          errort = "Server not responding";
        else
          errort = error.message;

        setTimeout(() => {
          toast.error(`There was an error: ${errort}`);
        } , 10);


        if(error.status === 401){
          sessionStorage.removeItem('user-data');
          globalNavigation.navigate?.('/login');
        }
        
        return Promise.reject(error);
      }
    );
  }
}

