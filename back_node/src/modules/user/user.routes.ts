import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { body, query } from "express-validator";
import { ValidationRoutesMiddleware } from "../../middlewares/validation.routes.middleware";
import { MailHandlerAdapter } from "../../utils/mail.adapter";

export class UserRoutes {

  static get routes(): Router {

    const router = Router();
    const mailAdapter = new MailHandlerAdapter();
    const userService = new UserService(mailAdapter);
    const userController = new UserController(userService);

    // Definir las rutas
    router.get('/login', 
      query(['password','username']).notEmpty(),
      query(['password','username']).isAlphanumeric(),
      ValidationRoutesMiddleware.validate,
      userController.login );

    router.post('/complete-register', 
      body(['password','username', 'email']).notEmpty().withMessage('missing property'),
      body(['username']).isAlphanumeric(),
      body(['email']).isEmail(),
      ValidationRoutesMiddleware.validate,
      userController.completeRegister );

    router.post('/register', 
      body(['username', 'password', 'email']).notEmpty().withMessage('missing property'),
      body(['email']).isEmail(),
      ValidationRoutesMiddleware.validate,
      userController.register );

    return router;
  }
}

