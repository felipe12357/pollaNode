import { Router } from 'express';
import { MatchRoutes } from './modules/match/match.routes';
import { ForeCastRoutes } from './modules/foreCast/foreCast.routes';
import { UserRoutes } from './modules/user/user.routes';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    router.use('/api/user', UserRoutes.routes );  
    router.use('/api/match', MatchRoutes.routes );
    router.use('/api/forecast', ForeCastRoutes.routes );
    return router;
  }

}