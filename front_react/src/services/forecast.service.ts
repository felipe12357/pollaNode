import axios from "axios";
import { AxiosHandlingInterceptor } from "./axios-handling.interceptor";
import type { MatchForecastDto } from "../dtos/match";
import type { ForecastResultDTO, Results } from "../dtos/forecast";

class ForecastService extends AxiosHandlingInterceptor {

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/forecast',
    });

    super(axiosInstance);
  }

  getByUserId = async(userId: number): Promise<MatchForecastDto[]> => {
    const response = await this.axiosInstance.get<MatchForecastDto[]>(`/${userId}`);
    return response.data;
  }

  updateForecast = async(userId:number, matchId: number, forecast: string): Promise<ForecastResultDTO>  => {
    const response = await this.axiosInstance.post<ForecastResultDTO>(`/`, { matchId, userId, forecast });
    return response.data;
  }

  getResults = async(): Promise<Results[]> => {
    const response = await this.axiosInstance.get<Results[]>(`/`);
    return response.data;
  }
}

const forecastService = new ForecastService();
export default forecastService;