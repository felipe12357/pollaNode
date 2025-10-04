import express from 'express';
import { AppRoutes } from './routes';

export class Server {
    private app = express();
    private PORT = 3000;
    private routes = AppRoutes.routes;

    static async start(){
        //use, significa q es un middleware
        const serverInstance = new Server();
        serverInstance.app.use(express.json()); //serializa los body de las peticiones a json
        serverInstance.app.use(express.urlencoded({extended:true})) // serializa los body de las peticiones x-www-form-urlencode
        serverInstance.app.use(serverInstance.routes)

        serverInstance.app.listen(serverInstance.PORT, () => {
            console.log(`Server running at http://localhost:${serverInstance.PORT}` );
        });
    }
}