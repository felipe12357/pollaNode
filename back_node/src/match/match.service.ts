import { prisma } from "../data";
import { MatchSource } from "../domain/AbstractModels";
import { MatchDto, MatchResultDto } from "../domain/entities";
import { Match } from "../generated/prisma";
import { SharedResources } from "../sharedResources";

export class MatchService implements MatchSource {

  public async getAll(): Promise<MatchDto[]> {
    const result = await prisma.match.findMany();

    return result.map(val => this.transformToEntity(val))
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
    const deleted = await prisma.match.delete({
      where: { id },
    });

    return deleted.id;
  }

  public async updateResult(id: number, result: string): Promise<MatchDto> {
    const updatedMatch =  await prisma.match.update({
      where: { id },
      data: { result },
    });
    return this.transformToEntity(updatedMatch); 
  }

  private transformToEntity(obj: Match): MatchDto {

    const dateTransformed: string = SharedResources.transformDate(obj?.date);

    return {...obj, date: dateTransformed};
  }
}