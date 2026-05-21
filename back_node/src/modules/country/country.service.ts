import { prisma } from "../../data";
import { CountrySource } from "../../domain/AbstractModels";
import { Country } from "../../generated/prisma";

export class CountryService implements CountrySource {

  public async getAll(): Promise<Country[]> {
     const result = await prisma.country.findMany();

     return result;
  }
}
