export type MatchDto = {
  team1: string;
  team2: string;
  date: string;
  result?: string | null;
  id?: number;
}

export type ForeCastDto = {
  matchId: number;
  userId: number;
  id?: number;
  result: string;
}