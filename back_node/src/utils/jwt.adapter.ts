import jwt from 'jsonwebtoken';

const JWT_SEED = <string> process.env.JWT

export class JwtAdapter {

    static async genereteToken(payload:any): Promise<string> {
        return await jwt.sign({ data: payload }, JWT_SEED , {expiresIn: '2h'})
    }

    static  async validateToken<T>(token:string): Promise<T> {
        try {
            return  await jwt.verify(token,JWT_SEED) as T;
        } catch (err: unknown) {
            if (err instanceof jwt.TokenExpiredError) {
                console.log('error token expired');
                //throw CustomError.unauthorized('token expired');
            }
            if (err instanceof jwt.JsonWebTokenError){
               console.log('error Invalid token');
                //throw CustomError.unauthorized('Invalid token'); 
            }
            throw err;
        }

    }
}