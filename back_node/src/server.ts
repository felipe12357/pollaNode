import express from 'express';
import { AppRoutes } from './routes';
import cors from "cors";

export class Server {
    private app = express();
    private PORT = 3000;
    private routes = AppRoutes.routes;
    private cors = cors;

    static async start(){
        //use, significa q es un middleware
        const serverInstance = new Server();
        serverInstance.app.use(express.json()); //serializa los body de las peticiones a json
        serverInstance.app.use(express.urlencoded({extended:true})) // serializa los body de las peticiones x-www-form-urlencode
        serverInstance.app.use(serverInstance.cors({ origin: 'http://localhost:5173' }))
        serverInstance.app.use(serverInstance.routes)

        serverInstance.app.listen(serverInstance.PORT, () => {
            console.log(`Server running at http://localhost:${serverInstance.PORT}` );
        });
    }
}