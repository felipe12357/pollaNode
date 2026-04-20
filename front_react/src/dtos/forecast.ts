export type ForecastResultDTO = {
  forecast: string;
  matchId: number;
  points?: number;
  userId: number;
}

export type Results = {
  points: number;
  username: string;
}