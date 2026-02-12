import { type AxiosInstance } from "axios";
import { toast } from "react-toastify";

export class ErrorHandlingInterceptor {

  constructor(axiosInstance: AxiosInstance) {
    this.handleError(axiosInstance);
  }

  private handleError(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
      response => response,
      error => {
        toast.error(`There was an error: ${error.response.data.errors[0]}`);
        return Promise.reject(error.response?.data ?? error);
      }
    );
  }
}

