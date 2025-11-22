import axios from "axios";
import type { MatchDto } from "../dtos/match";

class MatchService {

  axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/match',
  });

  getAll = async(): Promise<MatchDto[]> => {
    const response = await this.axiosInstance.get<MatchDto[]>(`/`);
    return response.data;
  }
}

const mathService = new MatchService();
export default mathService;