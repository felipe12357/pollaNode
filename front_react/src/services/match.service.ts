import axios from "axios";
import type { MatchDto, MatchResponse, MatchResultDto } from "../dtos/match";
import { AxiosHandlingInterceptor } from "./axios-handling.interceptor";

class MatchService extends AxiosHandlingInterceptor {

  constructor() {
    const environmentURL = import.meta.env.VITE_API_URL;
    const axiosInstance = axios.create({
    baseURL:  `${environmentURL}/match`,
    });

    super(axiosInstance);
  }

  getAll = async(): Promise<MatchDto[]> => {
    const response = await this.axiosInstance.get<MatchResponse[]>(`/`);
    return response.data.map(match => ({...match, date: new Date(match.date)}));
  }

  addMatch = async(match: MatchResponse): Promise<MatchDto> => {
    const val = { ...match, date: new Date(match.date).toISOString()};
    const response = await this.axiosInstance.post<MatchDto>('/', val);
    return response.data;
  }

  deleteMatch = async(matchId: number): Promise<number> => {
    const response = await this.axiosInstance.delete<number>(`/`,{ data: {id: matchId}});
    return response.data;
  }

  updateResult = async(data:MatchResultDto): Promise<MatchDto> => {
    const response = await this.axiosInstance.patch<MatchDto>(`/result`, data);
    return response.data;
  }
}

const mathService = new MatchService();
export default mathService;