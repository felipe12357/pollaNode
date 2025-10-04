import { Request, Response } from "express";
import { ForeCastSource } from "../domain/AbstractModels";
import { ForeCastDto } from "../domain/entities";
import { validationResult } from "express-validator";
import { SharedResources } from "../sharedResources";

export class ForeCastController {

  constructor(public readonly foreCastService: ForeCastSource) {}

  create = (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()){
      res.status(400).send({ errors: SharedResources.formatDTOErrors(validation.array()) });
    } else {
      const forecast: ForeCastDto = {
        ...req.body, 
        userId: +req.body.userId, 
        matchId: +req.body.matchId,
      };

      this.foreCastService.create(forecast)
        .then(result => res.status(200).send(result))
        .catch(error => {
         return res.status(500).send(error)
        })
    }
  }

  delete = (req: Request, res: Response) => {
    const validation = validationResult(req);

    if (!validation.isEmpty()){
      res.status(400).send({ errors: SharedResources.formatDTOErrors(validation.array()) });
    } else {
      const { matchId, userId } = req.body;

      this.foreCastService.delete(parseInt(matchId), parseInt(userId))
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error.meta.cause))
    }
  }

  getAll = (req: Request, res: Response) => {
    this.foreCastService.getAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error))
  }
}
