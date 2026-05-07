export type MatchDto = {
  team1: string;
  team2: string;
  date: Date;
  result?: string | null;
  id?: number;
  bonusPhase: boolean;
}

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
