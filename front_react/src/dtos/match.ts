export type MatchDto = {
  team1: string;
  team2: string;
  date: string;
  result?: string | null;
  id?: number;
}

export type MatchListResponse = {
  data: MatchDto[],
  error?: string,
}

export type MatchResultDto = {
  result: string;
  id: number;
}

export type MatchForecastDto = MatchDto & {
  foreCast: string;
  points?: number;
}

export type MatchForecastListResponse = {
  data: MatchForecastDto[],
  error?: string,
}
