import { prisma } from "../data";
import { ForeCastSource } from "../domain/AbstractModels";
import { ForeCastDto } from "../domain/entities";
import { MatchForecast } from "../generated/prisma";

export class ForeCastService implements ForeCastSource {

  public async getAll(): Promise<ForeCastDto[]> {
    const result = await prisma.matchForecast.findMany();

    return result.map(val => this.transformToEntity(val))
  }

  public async create(foreCast: ForeCastDto): Promise<ForeCastDto> {
    const { result, ...foreCastWithoutResult } = foreCast;
    const response: MatchForecast = await prisma.matchForecast.create({
      data:{ ...foreCastWithoutResult, resultForeCast: result}
    });

    return this.transformToEntity(response);
  }

  public async delete(matchId: number, userId: number): Promise<MatchForecast> {
    const deleted = await prisma.matchForecast.delete({
      where: { 
        userId_matchId:{ matchId:matchId, userId: userId } 
      },
    });
    return <MatchForecast>deleted;
  }


  private transformToEntity(obj: MatchForecast): ForeCastDto {
    const { resultForeCast, ...foreCastWithoutResult } = obj; 
    return {...foreCastWithoutResult, result: <string>resultForeCast};
  }
}