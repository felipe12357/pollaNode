import axios from "axios";
import { AxiosHandlingInterceptor } from "./axios-handling.interceptor";
import type { Country } from "../dtos/country";

class CountryService extends AxiosHandlingInterceptor {

  private countryList:Country[] = []

  constructor() {
    const axiosInstance = axios.create({
    baseURL:'http://localhost:3000/api/country',
    });

    super(axiosInstance);
  }

  getCountries = async(): Promise<Country[]> => {
    if(this.countryList.length === 0) {
      const response = await this.axiosInstance.get<Country[]>(`/`);
      this.countryList = response.data;
      return response.data;
    } else {
      return this.countryList;
    }
  }
}

const countryService = new CountryService();
export default countryService;