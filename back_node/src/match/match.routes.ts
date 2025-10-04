import { Router } from "express";
import { MatchController } from "./match.controller";
import { MatchService } from "./match.service";
import { body } from "express-validator";

export class MatchRoutes {

  static get routes(): Router {

    const router = Router();
    const matchService = new MatchService();
    const matchController = new MatchController(matchService);

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
       matchController.create );

    router.delete('/', 
      body(['id'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      matchController.delete );
    
    router.get('/', matchController.getAll);


    return router;
  }

}