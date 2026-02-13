import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../utils/jwt.adapter";
import { prisma } from "../data";
import { UserRole } from "../generated/prisma";

export class AuthMiddleware {
    // Este middle consulta si el usuario es correcto y si lo es, agrega la informacion del usuario
    static async validateJWT( req: Request, res: Response, next: NextFunction, validateRole?: UserRole):Promise<void> {
      const authorization = req.header('Authorization');

      if(!authorization){
          res.status(401).json({error: 'Not token provided'});
          return;
      }

      if(!authorization!.startsWith('Bearer ')){
          res.status(401).json({error: 'Invalid Bearer token'});
          return;
      }


      const token = authorization.split(' ')[1] || '';

      try {
        const payload = await JwtAdapter.validateToken<{data:{id:number}}>(token);
        const user = await prisma.user.findUnique({where:{
          id: payload.data.id
        }});

        if(!user || (validateRole && !(user.role === validateRole)) ) {
          res.status(401).json({error: 'Invalid token - user'});
          return;
        }
        const { password, ...userData } = user;
        req.body = {...req.body, user: userData}

        next(); // esta es la funcion q permite q la peticion continue con su flujo
        //es decir en este caso controlador -> service 
      } catch (error:any) {
        res.status(500).json({error:error});
      }
    }
}