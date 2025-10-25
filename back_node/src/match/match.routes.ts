import { Router } from "express";
import { MatchController } from "./match.controller";
import { MatchService } from "./match.service";
import { body, param, query } from "express-validator";
import { ValidationRoutesMiddleware } from "../middlewares/validation.routes.middleware";

export class MatchRoutes {

  static get routes(): Router {

    const router = Router();
    const matchService = new MatchService();
    const matchController = new MatchController(matchService);

    router.get('/', 
      matchController.getAll);

    router.get('/:userId',
      param('userId')
      .notEmpty().withMessage('missing property').bail()
      .isNumeric(),
      ValidationRoutesMiddleware.validate,
      matchController.getUserMatchList);

    //Body hace la validacion sobre el formato body/json 
    router.post('/',
      body(['team1'])
        .notEmpty().withMessage('missing property').bail()
        .isAlpha(),
      body(['team2'])
        .notEmpty().withMessage('missing property').bail()
        .isAlpha(),
      body(['date'])
        .notEmpty().withMessage('missing property').bail()
        .isDate(),
       ValidationRoutesMiddleware.validate,
       matchController.create );

    router.delete('/', 
      body(['id'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      ValidationRoutesMiddleware.validate,
      matchController.delete );
  
    //http://localhost:3000/api/match/result
    router.patch('/result',
      body(['id'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      body(['result'])
        .notEmpty().withMessage('missing property').bail()
         .matches(/^[0-9]-[0-9]$/).withMessage('must be in format N-N where N is 0-9'),
      ValidationRoutesMiddleware.validate,
      matchController.updateResult)

    return router;
  }

}