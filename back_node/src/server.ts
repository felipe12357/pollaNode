import express from 'express';
import { AppRoutes } from './routes';
import cors from "cors";
import { MatchCronProcess } from './modules/match/match.cron';

export class Server {
    private app = express();
    private PORT = 3000;
    private routes = AppRoutes.routes;
    private cors = cors;

    static async start(){
        // TODO
        MatchCronProcess.updateMatchProcess();

        //use, significa q es un middleware
        const serverInstance = new Server();
        serverInstance.app.use(express.json()); //serializa los body de las peticiones a json
        serverInstance.app.use(express.urlencoded({extended:true})) // serializa los body de las peticiones x-www-form-urlencode
        serverInstance.app.use(serverInstance.cors({ origin: [
            'http://localhost:5173',
            'http://localhost:4200',
            'polla-node-4yvx.vercel.app',
            'http://polla-node-4yvx.vercel.app',
            'https://polla-node-4yvx.vercel.app',
            'https://polla-node-4yvx-git-master-felipe12357s-projects.vercel.app'
        ] }))
        serverInstance.app.use(serverInstance.routes)

        serverInstance.app.listen(serverInstance.PORT, () => {
            console.log(`Server running at http://localhost:${serverInstance.PORT}` );
        });
    }
}
// import { MatchCronProcess } from './modules/match/match.cron';

/* export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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

 export class Server {
    private PORT = 3000;

    static async start(){

        MatchCronProcess.updateMatchProcess();

        app.listen(new Server().PORT, () => {
            console.log(`Server running at http://localhost:${new Server().PORT}` );
        });
    }
}  */