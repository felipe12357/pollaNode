import { Match, MatchForecast, User } from "../generated/prisma";

export type MatchDto = Omit<Match, 'foreCast' | 'date'> & {
  date: string;
}

export type MatchResultDto = MatchDto & {
  foreCast: string | null;
  points?: number;
}

export type ForeCastDto = Omit<MatchForecast, 'resultForeCast'> & {
  id?: number;
  forecast: string;
}

export type UserValidationDto = {
  username: string;
  password: string;
}

export type UserRegisterDto = UserValidationDto & {
  email: string;
}

export type UserValidationRDto = Omit<User, 'password' | 'foreCast'> & {
  token: string;
}

export type UserData = Omit<User, 'password' | 'foreCast'>