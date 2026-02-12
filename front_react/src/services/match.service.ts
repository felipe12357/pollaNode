import axios, { type AxiosInstance } from "axios";
import type { MatchDto, MatchResultDto } from "../dtos/match";
import { ErrorHandlingInterceptor } from "./error-handling.interceptor";

class MatchService extends ErrorHandlingInterceptor {

  private axiosInstance: AxiosInstance; 

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/match',
    });

    super(axiosInstance);
    this.axiosInstance = axiosInstance;
  }


  getAll = async(): Promise<MatchDto[]> => {
    const response = await this.axiosInstance.get<MatchDto[]>(`/`);
    return response.data;
  }

  addMatch = async(match: MatchDto): Promise<MatchDto> => {
    const response = await this.axiosInstance.post<MatchDto>('/', match);
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