import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";

export class ErrorHandlingInterceptor {

  protected axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
    this.handleError();
  }

  private handleError() {
    this.axiosInstance.interceptors.response.use(
      response => response,
      error => {
        toast.error(`There was an error: ${error.response.data.errors[0]}`);
        return Promise.reject(error.response?.data ?? error);
      }
    );
  }
}

