import { Router } from 'express';
import { MatchRoutes } from './match/match.routes';
import { ForeCastRoutes } from './foreCast/foreCast.routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();    
    router.use('/api/match', MatchRoutes.routes );
     router.use('/api/foreCast', ForeCastRoutes.routes );
    return router;
  }

}