import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export class ValidationRoutesMiddleware {

  static validate = (req: Request, res: Response, next: NextFunction): void  =>{
   const validation = validationResult(req);
   
    if (!validation.isEmpty()){
      res.status(400).send({ errors: ValidationRoutesMiddleware.formatDTOErrors(validation.array()) });
      return;
    }

    next();
  }

  private static formatDTOErrors(error:{msg: string, path?: string}[]) {
      return error.map(err => `field ${err.path} ${err.msg}`)
  }
}