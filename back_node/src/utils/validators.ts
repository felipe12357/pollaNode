import { prisma } from "../data";


export class Validators {
  static async validTeam(team: string): Promise<void | Error> {
    const result = await prisma.country.findFirst({
      where: {name: team}
    })

    if(!result) {
      throw new Error();
    }
  }

  static async uniqueUserName(username: string): Promise<void | Error> {
    const result = await prisma.user.findFirst({
      where: { username }
    })

    if(result) {
      throw new Error('username already exits');
    }
  }

  static async uniqueEmail(email: string): Promise<void | Error> {
    const result = await prisma.user.findFirst({
      where: {email}
    })

    if(result) {
      throw new Error('Email already exits')
    }
  }
}