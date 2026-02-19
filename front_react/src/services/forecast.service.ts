import axios from "axios";
import { AxiosHandlingInterceptor } from "./axios-handling.interceptor";
import type { MatchDto } from "../dtos/match";

class ForecastService extends AxiosHandlingInterceptor {

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/forecast',
    });

    super(axiosInstance);
  }

  getByUserId = async(userId: number): Promise<MatchDto[]> => {
    const response = await this.axiosInstance.get<MatchDto[]>(`/${userId}`);
    return response.data;
  }
}

const forecastService = new ForecastService();
export default forecastService;