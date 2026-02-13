import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";

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
        const token = sessionStorage.getItem('user-token');
        if (token) 
          config.headers.Authorization = `Bearer ${token}`;

        return config;
      }
    );
  }

  private handleError() {
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        const errort = error.response.data.error || error.response.data?.errors[0];
        toast.error(`There was an error: ${errort}`);
        return Promise.reject(error);
      }
    );
  }
}

