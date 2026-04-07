import { prisma } from "../../data";
import { MailHandler, UserSource } from "../../domain/AbstractModels";
import { UserRegisterDto, UserValidationDto, UserValidationRDto } from "../../domain/entities";
import { BcryptAdapter } from "../../utils/bcrypt.adapter";
import { JwtAdapter } from "../../utils/jwt.adapter";

export class UserService extends UserSource {

  constructor(mailHandler: MailHandler) {
    super(mailHandler);
  }

  public async login({username, password}: UserValidationDto): Promise<UserValidationRDto> {
    const existsUser = await prisma.user.findFirst({
      where: { username },
    });

    if(existsUser) {
      if( BcryptAdapter.compare(password, existsUser.password) ) {
        const token = await JwtAdapter.genereteToken({id: existsUser.id, username: existsUser.username});
        const { password, ...foundUser} = existsUser;
        return {...foundUser, token};
      } else {
        throw new Error('bad credentials');
      }
    }

    throw new Error('bad credentials');
  }

  public async register(data: UserRegisterDto): Promise<boolean> {
    const message = this.getRegisterMail(data.username, data.password)
    const response = await this.mailHandler.sendMail(<string>process.env.EMAIL_USER,data.email, 'Registro Polla', message);

    return response;
  }

  private getRegisterMail(username:string, password: string): string {
    const encrypterPassword = BcryptAdapter.hash(password);
    const mailText = `<p>Para completar el registro en la aplicación da click en el siguiente enlace:</p>
    
    <a href='${process.env.APP_URL}/api/user/complete-register?username=${username}&password=${encrypterPassword}'> 
      Completar registro 
    </a>`;
   
    return mailText;
  }
}

