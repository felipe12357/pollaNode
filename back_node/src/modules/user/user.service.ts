import { prisma } from "../../data";
import { UserSource } from "../../domain/AbstractModels";
import { UserValidationDto, UserValidationRDto } from "../../domain/entities";
import { BcryptAdapter } from "../../utils/bcrypt.adapter";
import { JwtAdapter } from "../../utils/jwt.adapter";

export class UserService implements UserSource {

  public async login({username, password}: UserValidationDto): Promise<UserValidationRDto> {
    // console.log('password encriptado', BcryptAdapter.hash(password));
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
}

