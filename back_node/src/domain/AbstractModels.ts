import { MatchForecast } from "../generated/prisma";
import { ForeCastDto, MatchDto } from "./entities";

export abstract class MatchSource {
  abstract create(match: MatchDto): Promise<MatchDto>
  abstract delete(id: number): Promise<number>
  abstract getAll(): Promise<MatchDto[]>
}

export abstract class ForeCastSource {
  abstract create(foreCast: ForeCastDto): Promise<ForeCastDto>
  abstract delete(matchId: number, userId:number): Promise<MatchForecast>
  abstract getAll(): Promise<ForeCastDto[]>
}