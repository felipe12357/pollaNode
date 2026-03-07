import { Router } from "express";
import { ForeCastController } from "./foreCast.controller";
import { ForeCastService } from "./foreCast.service";
import { body, param } from "express-validator";
import { ValidationRoutesMiddleware } from "../middlewares/validation.routes.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class ForeCastRoutes {

  static get routes(): Router {

    const router = Router();
    const matchService = new ForeCastService();
    const foreCastController = new ForeCastController(matchService);

    router.get('/:userId',
      param('userId')
      .notEmpty().withMessage('missing property').bail()
      .isNumeric(),
      ValidationRoutesMiddleware.validate,
      (req, res, next) => AuthMiddleware.validateJWT(req, res, next),
      foreCastController.getUserMatchForecast);

    //Body hace la validacion sobre el formato body/json 
    router.post('/',
      body(['matchId'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      body(['userId'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      body(['forecast'])
        .notEmpty().withMessage('missing property').bail()
         .matches(/^[0-9]-[0-9]$/).withMessage('must be in format N-N where N is 0-9'),
      ValidationRoutesMiddleware.validate,
      foreCastController.create );

    router.delete('/', 
      body(['matchId'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      body(['userId'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      ValidationRoutesMiddleware.validate,
      foreCastController.delete );
    
    router.get('/', foreCastController.getAll);


    return router;
  }

}