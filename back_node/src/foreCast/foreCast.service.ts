import { prisma } from "../data";
import { ForeCastSource } from "../domain/AbstractModels";
import { ForeCastDto, MatchResultDto } from "../domain/entities";
import { MatchForecast } from "../generated/prisma";
import { SharedResources } from "../sharedResources";

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

  public async getUserMatchList(userId:number): Promise<MatchResultDto[]> {
    const result = await prisma.match.findMany({
      include: {
        foreCast: {
          select: {
           resultForeCast: true,
          },
          where: { userId }
        },
      },
    });

    const response = result.map(val => {
      return { ...val, 
        date: SharedResources.transformDate(val.date), 
        foreCast: val.foreCast.length > 0 ? val.foreCast[0]!.resultForeCast : null};
    });
    
    return response;
  }


  private transformToEntity(obj: MatchForecast): ForeCastDto {
    const { resultForeCast, ...foreCastWithoutResult } = obj; 
    return {...foreCastWithoutResult, result: <string>resultForeCast};
  }
}