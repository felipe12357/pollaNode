import { Country, Match, MatchForecast, User } from "../generated/prisma";

export type MatchDto = Omit<Match, 'foreCast'>

export type MatchResultDto = MatchDto & {
  foreCast: string | null;
  points?: number;
}

export type MatchForecastListResponse = Match & {
  foreCast: { 
    resultForeCast: string | null, 
    points: number | null,
    user: string,
  }[],
}

export type MatchCountry = Match & {
  countryHome: Country;
  countryVisitor: Country;
};

export type ForecastByMatch = MatchDto & {
  foreCast: { 
    resultForeCast: string | null, 
    points: number | null,
    user: { username: string }
  }[],
}

export type ForecastByUser = Match & {
  foreCast: { 
    resultForeCast: string | null; 
    points: number |null; 
  }[]
}

export type ForeCastDto = Omit<MatchForecast, 'resultForeCast' | 'points'> & {
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

export type Results =  {
  points: number;
  username: string;
  userId: number;
}

export type ApiMatch = {
  homeTeam: {
    name: string,
  },
  awayTeam: {
    name: string,
  },
  score: {
    duration: string;
    winner: string
    fullTime: {
      home: number,
      away: number,
    },
    regularTime: {
      home: number,
      away: number,
    }
  }
}