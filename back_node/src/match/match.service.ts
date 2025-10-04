import { prisma } from "../data";
import { MatchSource } from "../domain/AbstractModels";
import { MatchDto } from "../domain/entities";
import { Match } from "../generated/prisma";

export class MatchService implements MatchSource {

  public async getAll(): Promise<MatchDto[]> {
    const result = await prisma.match.findMany();

    return result.map(val => this.transformToEntity(val))
  }

  public async create(match: MatchDto): Promise<MatchDto> {
    const result:Match = await prisma.match.create({
      data:{
        ...match,
        date: new Date(match.date),
      }
    });

    const dateTransformed: string = result?.date
      ? <string> result?.date.toISOString().split('T')[0]
      : '';

    return {...result, date: dateTransformed};
  }

  public async delete(id: number): Promise<number> {
    const deleted = await prisma.match.delete({
      where: { id },
    });

    return deleted.id;
  }

  private transformToEntity(obj: Match): MatchDto {

    const dateTransformed: string = obj?.date
      ? <string> obj?.date.toISOString().split('T')[0]
      : '';

    return {...obj, date: dateTransformed};
  }
}