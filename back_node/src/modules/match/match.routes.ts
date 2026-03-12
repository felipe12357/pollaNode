import { Router } from "express";
import { MatchController } from "./match.controller";
import { MatchService } from "./match.service";
import { body } from "express-validator";
import { ValidationRoutesMiddleware } from "../middlewares/validation.routes.middleware";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { UserRole } from "../generated/prisma";

export class MatchRoutes {

  static get routes(): Router {

    const router = Router();
    const matchService = new MatchService();
    const matchController = new MatchController(matchService);
    //implemento el AutHMiddleware para todas las rutas
    router.use((req, res, next) => AuthMiddleware.validateJWT(req, res, next, UserRole.ADMIN))

    router.get('/', matchController.getAll);

    //Body hace la validacion sobre el formato body/json 
    router.post('/',  (req, res, next) =>
      body(['team1'])
        .notEmpty().withMessage('missing property').bail()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),
      body(['team2'])
        .notEmpty().withMessage('missing property').bail()
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/),
      body(['date'])
        .notEmpty().withMessage('missing property').bail()
        .isDate(),
       ValidationRoutesMiddleware.validate,
       matchController.create );

    router.delete('/', (req, res, next) =>
      body(['id'])
        .notEmpty().withMessage('missing property').bail()
        .isNumeric(),
      ValidationRoutesMiddleware.validate,
      matchController.delete );
  
    //http://localhost:3000/api/match/result
    router.patch('/result', (req, res, next) =>
    //  AuthMiddleware.validateJWT(req, res, next, UserRole.ADMIN),
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