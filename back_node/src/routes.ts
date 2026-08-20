import { Router } from 'express';
import { MatchRoutes } from './modules/match/match.routes';
import { ForeCastRoutes } from './modules/foreCast/foreCast.routes';
import { UserRoutes } from './modules/user/user.routes';
import { CountryRoutes } from './modules/country/country.routes';
import { Seed } from './seed/seed';

export class AppRoutes {

  static get routes(): Router {
    const router = Router();
    router.use('/api/user', UserRoutes.routes );  
    router.use('/api/match', MatchRoutes.routes );
    router.use('/api/forecast', ForeCastRoutes.routes );
    router.use('/api/country', CountryRoutes.routes );
    router.get('/api/seed', async (req, res) => {
      try {
        await Seed.start();
        res.json({ message: 'Database seeded successfully' });
      } catch (error) {
        console.error('Error ejecutando seed:', error);
        res.status(500).json({ error: 'Seed failed' });
      }
    });
    return router;
  }

}