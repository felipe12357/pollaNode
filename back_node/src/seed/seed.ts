import * as fs from "fs";
import * as path from "path";
import { prisma } from "../data";

export class Seed {
  private parseCsv(content: string): Record<string, string>[] {
    const lines = content.trim().split(/\r?\n/);
    const headers = lines[0]!.split(",").map((h) => h.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = (values[index] ?? "").trim();
      });
      return row;
    });
  }

  static async start(): Promise<void> {
    const instance = new Seed();
    const countriesCsv = fs.readFileSync(
      path.join(__dirname,"CountryPolla.csv"),
      "utf-8"
    );
    const matchesCsv = fs.readFileSync(
      path.join(__dirname,"MatchPolla.csv"),
      "utf-8"
    );

    const countries = instance.parseCsv(countriesCsv);
    const matches = instance.parseCsv(matchesCsv);

    for (const country of countries) {
      await prisma.country.upsert({
        where: { code: country.code! },
        update: {
          name: country.name!,
          englishName: country.englishName || null,
        },
        create: {
          name: country.name!,
          code: country.code!,
          englishName: country.englishName || null,
        },
      });
    }

    console.log(`Países procesados: ${countries.length}`);

    for (const match of matches) {
      const data = {
        team1: match.team1!,
        team2: match.team2!,
        date: new Date(match.date!),
        result: match.result || null,
        bonusPhase: match.bonusPhase === "true",
      };

      await prisma.match.upsert({
        where: { id: Number(match.id) },
        update: data,
        create: { id: Number(match.id), ...data },
      });
    }

    await prisma.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Match"', 'id'), COALESCE((SELECT MAX(id) FROM "Match"), 1))`
    );

    console.log(`Partidos procesados: ${matches.length}`);
  }


}


