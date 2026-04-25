import { prisma } from "../../data";
import { MatchSource } from "../../domain/AbstractModels";
import { MatchDto } from "../../domain/entities";
import { Match } from "../../generated/prisma";
import { SharedResources } from "../../sharedResources";

export class MatchService implements MatchSource {

  public async getAll(): Promise<MatchDto[]> {
    const result = await prisma.match.findMany({
      orderBy: { date: 'asc' }
    });

    return result.map(val => this.transformToEntity(val))
  }

  public async create(match: MatchDto): Promise<MatchDto> {
    const result:Match = await prisma.match.create({
      data:{
        ...match,
        date: new Date(match.date),
      }
    });

    const dateTransformed: string = SharedResources.transformDate(result?.date);

    return {...result, date: dateTransformed};
  }

  public async delete(id: number): Promise<number> {
    await prisma.matchForecast.deleteMany({
      where: {
        matchId:id,
      }
    });

    const deleted = await prisma.match.delete({
      where: { id },
    });
    return deleted.id;
  }

  public async updateResult(id: number, result: string, bonusPhase: boolean): Promise<MatchDto> {
    const updatedMatch =  await prisma.match.update({
      where: { id },
      data: { result, bonusPhase },
    });

    this.updatePoints(id, result, updatedMatch.bonusPhase)
    return this.transformToEntity(updatedMatch); 
  }

  private async updatePoints(matchId: number, result: string, phaseBonus: boolean): Promise<void> {
    const forecastList = await prisma.matchForecast.findMany({
      where: { matchId }
    });

    await prisma.$transaction(
      forecastList.filter(forecast => forecast.resultForeCast).map(forecast =>{
        const points = this.calculatePoints(forecast.resultForeCast!, result, phaseBonus)
        return prisma.matchForecast.update({
          where: {
            // toca asi por q en el modelo dije q la clave primaria es compuesta
            //  @@unique([userId, matchId]) //esto es para q no se pueda repetir la combinacion
            userId_matchId: {
              userId: forecast.userId,
              matchId: forecast.matchId
            }
          },
          data: {
            points:points
          }
        })
      })
    )
  }

  private calculatePoints(resultForeCast:string, result: string, phaseBonus:boolean): number {
    let points = 0;
    const forecastDigits = <string[]>resultForeCast?.split('-');
    const resultDigits = result?.split('-');

    //valida numero goles local
    if( forecastDigits[0] === resultDigits[0])
      points = phaseBonus ? points + 4 : points + 2;

    // valida numero goles visitante
    if( forecastDigits[1] === resultDigits[1])
      points = phaseBonus ? points + 4 : points + 2;

    // valida diferencia de goles
    if( Math.abs(+forecastDigits[0]! - +forecastDigits[1]!) ===  Math.abs(+resultDigits[0]! - +resultDigits[1]!)) {
      points = phaseBonus ? points + 2 : points + 1;
    }

    // valida ganador
    if( (+forecastDigits[0]! > +forecastDigits[1]! && +resultDigits[0]! > +resultDigits[1]!)
      || (+forecastDigits[0]! < +forecastDigits[1]! && +resultDigits[0]! < +resultDigits[1]!)
      || (+forecastDigits[0]! === +forecastDigits[1]! && +resultDigits[0]! === +resultDigits[1]!) ) {
      points = phaseBonus ? points + 10 : points + 5;
    }

    return points;
  }

  private transformToEntity(obj: Match): MatchDto {

    const dateTransformed: string = SharedResources.transformDate(obj?.date);

    return {...obj, date: dateTransformed};
  }
}