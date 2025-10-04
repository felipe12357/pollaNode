import { Request, Response } from "express";
import { MatchSource } from "../domain/AbstractModels";
import { MatchDto } from "../domain/entities";
import { validationResult } from "express-validator";
import { SharedResources } from "../sharedResources";

export class MatchController {

  constructor(public readonly matchService: MatchSource) {}

  create = (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()){
      res.status(400).send({ errors: SharedResources.formatDTOErrors(validation.array()) });
    } else {
      const match: MatchDto = req.body;

      this.matchService.create(match)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error))
    }
  }

  getAll = (req: Request, res: Response) => {
    this.matchService.getAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error))
  }

  delete = (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()){
      res.status(400).send({ errors: SharedResources.formatDTOErrors(validation.array()) });
    } else {
      const { id } = req.body;

      this.matchService.delete(parseInt(id))
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error.meta.cause))
    }
  }
}
