import { Request, Response } from "express";
import { MatchSource } from "../domain/AbstractModels";
import { MatchDto } from "../domain/entities";

export class MatchController {

  constructor(public readonly matchService: MatchSource) {}

  create = (req: Request, res: Response) => {
    const match: MatchDto = req.body;

    this.matchService.create(match)
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error))
  }

  getAll = (req: Request, res: Response) => {
    this.matchService.getAll()
      .then(result => res.status(200).send(result))
      .catch(error => res.status(500).send(error))
  }

  getUserMatchList = (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId!);

    this.matchService.getUserMatchList(userId)
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error));
  }


  delete = (req: Request, res: Response) => {
    const { id } = req.body;

    this.matchService.delete(parseInt(id))
        .then(result => res.status(200).send(result))
        .catch(error => res.status(500).send(error.meta.cause))
  }

  updateResult = (req: Request, res: Response) => {
    const { id, result } = req.body;
    this.matchService.updateResult(parseInt(id), result)
      .then(updatedMatch => res.status(200).send(updatedMatch))
      .catch(error => res.status(500).send(error.meta.cause))
  }
}
