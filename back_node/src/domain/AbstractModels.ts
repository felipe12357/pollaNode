import { MatchForecast } from "../generated/prisma";
import { ForeCastDto, MatchDto, Results, UserRegisterDto, UserValidationDto, UserValidationRDto } from "./entities";

export abstract class MatchSource {
  abstract create(match: MatchDto): Promise<MatchDto>
  abstract delete(id: number): Promise<number>
  abstract getAll(): Promise<MatchDto[]>
  abstract updateResult(id: number, result: string): Promise<MatchDto>
}

export abstract class ForeCastSource {
  abstract create(foreCast: ForeCastDto): Promise<ForeCastDto>
  abstract delete(matchId: number, userId:number): Promise<MatchForecast>
  abstract getAll(): Promise<Results[]>
  abstract getUserMatchList(id: number): Promise<unknown>
  abstract update(foreCast: ForeCastDto): Promise<ForeCastDto>
}

export abstract class UserSource {
  constructor(protected mailHandler: MailHandler) { }
  abstract login(userPass: UserValidationDto): Promise<UserValidationRDto>
  abstract register(userData: UserRegisterDto): Promise<boolean>
  abstract completeRegister(userData: UserRegisterDto): Promise<UserValidationRDto>
}

export abstract class MailHandler {
  abstract sendMail(from: string, to: string, subject: string, text: string): Promise<boolean>
}