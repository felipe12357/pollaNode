import { MatchForecast } from "../generated/prisma";
import { ForeCastDto, MatchDto } from "./entities";

export abstract class MatchSource {
  abstract create(match: MatchDto): Promise<MatchDto>
  abstract delete(id: number): Promise<number>
  abstract getAll(): Promise<MatchDto[]>
  abstract updateResult(id: number, result: string): Promise<MatchDto>
  abstract getUserMatchList(id: number): Promise<unknown>
}

export abstract class ForeCastSource {
  abstract create(foreCast: ForeCastDto): Promise<ForeCastDto>
  abstract delete(matchId: number, userId:number): Promise<MatchForecast>
  abstract getAll(): Promise<ForeCastDto[]>
}