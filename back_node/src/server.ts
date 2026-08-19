import express from 'express';
import { AppRoutes } from './routes';
import cors from "cors";
// import { MatchCronProcess } from './modules/match/match.cron';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:4200',
        'polla-node-4yvx.vercel.app',
        'http://polla-node-4yvx.vercel.app',
        'https://polla-node-4yvx.vercel.app',
        'https://polla-node-4yvx-git-master-felipe12357s-projects.vercel.app'
    ]
}));
app.get('/api/test', (req, res) => {
  res.json({
    ok: true,
    message: 'Express funcionando'
  });
});
app.use(AppRoutes.routes);

/* export class Server {
    private PORT = 3000;

    static async start(){

        MatchCronProcess.updateMatchProcess();

        app.listen(new Server().PORT, () => {
            console.log(`Server running at http://localhost:${new Server().PORT}` );
        });
    }
} */