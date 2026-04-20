import { Request, Response } from "express";
import { UserRegisterDto, UserValidationDto } from "../../domain/entities";
import { UserSource } from "../../domain/AbstractModels";

export class UserController {
  constructor(public readonly userService: UserSource) {}

  login = (req: Request, res: Response) => {
    const userPass: UserValidationDto = req.query as unknown as UserValidationDto;

    this.userService.login(userPass)
      .then(result => res.status(200).send(result))
      .catch(error => {
        console.error(error.message);
        return res.status(400).send({ errors: ['hubo un error'] })
      })
  }

  register = (req: Request, res: Response) => {
    const userData: UserRegisterDto = req.body as unknown as UserRegisterDto;
    
    this.userService.register(userData)
      .then(result => res.status(200).send(result))
      .catch(error => {
        console.error(error.message);
        return res.status(400).send({ errors: ['hubo un error'] })
      });
  }

  completeRegister = (req: Request, res: Response) => {
    const userData: UserRegisterDto = req.body as unknown as UserRegisterDto;

    this.userService.completeRegister(userData)
      .then(result => res.status(200).send(result))
      .catch(error => {
        console.error(error.message);
        return res.status(400).send({ errors: ['unknow error'] })
      });
  }
}
