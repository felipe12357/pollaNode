import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { body, param, query } from "express-validator";
import { ValidationRoutesMiddleware } from "../../middlewares/validation.routes.middleware";

export class UserRoutes {

  static get routes(): Router {

    const router = Router();
    const userService = new UserService();
    const userController = new UserController(userService);

    // Definir las rutas
    router.get('/login', 
      query(['password','username']).notEmpty(),
      query(['password','username']).isAlphanumeric(),
      ValidationRoutesMiddleware.validate,
      userController.login );

    return router;
  }
}

