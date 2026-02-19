import { Router } from 'express';
import { MatchRoutes } from './match/match.routes';
import { ForeCastRoutes } from './foreCast/foreCast.routes';
import { UserRoutes } from './user/user.routes';

export class AppRoutes {

  static get routes(): Router {

    const router = Router();
    router.use('/api/user', UserRoutes.routes );  
    router.use('/api/match', MatchRoutes.routes );
    router.use('/api/forecast', ForeCastRoutes.routes );
    return router;
  }

}