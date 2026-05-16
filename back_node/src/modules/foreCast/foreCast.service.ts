import { prisma } from "../../data";
import { ForeCastSource } from "../../domain/AbstractModels";
import { ForecastByUser, ForeCastDto, MatchResultDto, Results } from "../../domain/entities";
import { MatchForecast } from "../../generated/prisma";

export class ForeCastService implements ForeCastSource {

  public async getAll(): Promise<Results[]> {

    const result = await <Results[]><unknown>(prisma.$queryRaw `
      SELECT 
        "User"."username",
        "User"."id" as "userId",
         COALESCE(SUM ("MatchForecast"."points")::int, 0) as points
      from "User"
        left join "MatchForecast" on "User"."id" = "MatchForecast"."userId"
      Group By "User"."username", "User"."id"
      Order By "points" DESC, "User"."username"
    `);

    return result;
  }

  public async create(val: ForeCastDto): Promise<ForeCastDto> {
    const { forecast, ...foreCastWithoutResult } = val;

    if(! await this.isValidUpdateForecast(val.matchId)) {
       throw new Error('to late for update forecast');
    }

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

  public async spyUserMatchList(userId:number): Promise<MatchResultDto[]> {
    const notYetLabel = 'Esperando';
    const notSetted = 'Sin ingresar';

    const result = await <MatchResultDto[]><unknown>(prisma.$queryRaw `
      SELECT
       "Match".*,
       "MatchForecast"."points",
       "MatchForecast"."userId",
      CASE
        WHEN "Match"."date" > 'NOW' THEN ${notYetLabel}
        WHEN "MatchForecast"."resultForeCast" IS NULL THEN ${notSetted}
        ELSE "MatchForecast"."resultForeCast"
      END AS "foreCast"
      from "Match"
      CROSS JOIN "User"
      left join "MatchForecast" 
        on "Match"."id" = "MatchForecast"."matchId"
        and "MatchForecast"."userId" = "User"."id"
      where "User"."id" = ${userId}
      Order By "Match"."date" ASC
    `);

    return result;
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
      orderBy: { date: 'asc' }
    });

    return this.transformMatchResult(result);
  }

  private transformMatchResult(result: ForecastByUser[] ): MatchResultDto[] {
    return result.map(val => {
      return <MatchResultDto> { ...val, 
        date: val.date, 
        foreCast: val.foreCast.length > 0 ? val.foreCast[0]!.resultForeCast : null,
        points:   val.foreCast.length > 0 ? val.foreCast[0]!.points: null};
    });
  }


  private async isValidUpdateForecast(matchId:number): Promise<boolean> {
    const match = await prisma.match.findFirst({
      where: {
        id:matchId
      }
    });

    const eventTime = match!.date.getTime();
    const oneHourBefore = eventTime - 3600000;

    return Date.now() < oneHourBefore;
  }

  private transformToEntity(obj: MatchForecast): ForeCastDto {
    const { resultForeCast, ...foreCastWithoutResult } = obj; 
    return {...foreCastWithoutResult, forecast: <string>resultForeCast};
  }
}