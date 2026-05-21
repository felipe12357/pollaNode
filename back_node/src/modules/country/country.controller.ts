import { CountrySource } from "../../domain/AbstractModels";
import { Request, Response } from "express";

export class CountryController {

  constructor(private readonly countryService: CountrySource) {}

  getAll = (req: Request, res: Response) => {
    this.countryService.getAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error))
  }
}