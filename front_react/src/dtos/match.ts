export type MatchDto = {
  team1: string;
  team2: string;
  date: Date;
  result?: string | null;
  id?: number;
  bonusPhase: boolean;
}

export type MatchForecast =
  MatchDto & { foreCast: { 
    resultForeCast: string | null, 
    points: number | null,
    user: string,
  }[] }


export type MatchResponse = Omit<MatchDto, 'date'> & {
  date: string;
}


export type MatchListResponse = {
  data: MatchDto[],
  error?: string,
}

export type MatchResultDto = {
  result: string;
  id: number;
  bonusPhase: boolean;
}

export type MatchForecastDto = MatchDto & {
  foreCast: string;
  points?: number;
}

export type MatchForecastListResponse = {
  data: MatchForecastDto[],
  error?: string,
}

export type MatchForecastResponse = {
  data: MatchForecast,
  error?: string,
}
