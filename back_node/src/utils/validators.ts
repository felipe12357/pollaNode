import { prisma } from "../data";


export class Validators {
  static async validTeam(team: string) {
    const result = await prisma.country.findFirst({
      where: {name: team}
    })

    if(!result) {
      throw new Error();
    }
  }
}