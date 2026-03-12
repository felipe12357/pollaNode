import { prisma } from "../../data";
import { ForeCastSource } from "../../domain/AbstractModels";
import { ForeCastDto, MatchResultDto } from "../../domain/entities";
import { MatchForecast } from "../../generated/prisma";
import { SharedResources } from "../../sharedResources";

export class ForeCastService implements ForeCastSource {

  public async getAll(): Promise<ForeCastDto[]> {
    const result = await prisma.matchForecast.findMany();

    return result.map(val => this.transformToEntity(val))
  }

  public async create(val: ForeCastDto): Promise<ForeCastDto> {
    const { forecast, ...foreCastWithoutResult } = val;

    const exits = await prisma.matchForecast.findFirst({
      where: {
        userId: val.userId,
        matchId: val.matchId,
      }
    })

    if(exits)
      return await this.update(val);
    else {
      const response: MatchForecast = await prisma.matchForecast.create({
        data:{ ...foreCastWithoutResult, resultForeCast: forecast}
      });

      return this.transformToEntity(response);
    }
  }

  public async update(forecast: ForeCastDto): Promise<ForeCastDto> {
    const response = await prisma.matchForecast.update({
      where: {
        userId_matchId: {
            userId: forecast.userId,
            matchId: forecast.matchId
        },
      },
      data:{ 
        resultForeCast: forecast.forecast
      }
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
           points: true,
          },
          where: { userId }
        },
      },
    });

    const response = result.map(val => {
      return <MatchResultDto> { ...val, 
        date: SharedResources.transformDate(val.date), 
        foreCast: val.foreCast.length > 0 ? val.foreCast[0]!.resultForeCast : null,
        points:   val.foreCast.length > 0 ? val.foreCast[0]!.points: null};
    });
    return response;
  }


  private transformToEntity(obj: MatchForecast): ForeCastDto {
    const { resultForeCast, ...foreCastWithoutResult } = obj; 
    return {...foreCastWithoutResult, forecast: <string>resultForeCast};
  }
}