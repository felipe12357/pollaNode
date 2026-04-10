import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import globalNavigation from "../utilities/navigation";
import { GetSessionUser } from "../utilities/session.storage";

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
        const sessionUserData = GetSessionUser();
        if(sessionUserData) {
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
        let errort = "Error desconocido";

        if (error.response)
          errort = error.response?.data.error || error.response?.data?.errors[0];
        else if (error.request)
          errort = "No hay respuesta del Servidor";
        else
          errort = error.message;

        setTimeout(() => {
          toast.error(`Hubo un error: ${errort}`);
        } , 300);

        if(error.status === 401){
          sessionStorage.removeItem('user-data');
          globalNavigation.navigate?.('/login');
        }
        
        return Promise.reject(error);
      }
    );
  }
}

