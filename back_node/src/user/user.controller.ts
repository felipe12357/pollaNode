import { Request, Response } from "express";
import { UserValidationDto } from "../domain/entities";
import { UserSource } from "../domain/AbstractModels";

export class UserController {
  constructor(public readonly userService: UserSource) {}

  login = (req: Request, res: Response) => {
    const userPass: UserValidationDto = req.body;

    this.userService.login(userPass)
      .then(result => res.status(200).send(result))
      .catch(error => {
        return res.status(401).send({ message: error.message })
      })
  }
}
