import { Router } from "express";
import { CountryService } from "./country.service";
import { CountryController } from "./country.controller";

export class CountryRoutes {

  static get routes(): Router {

    const router = Router();
    const countryService = new CountryService();
    const countryController = new CountryController(countryService);
    
    router.get('/', countryController.getAll);

    return router;
  }
}
