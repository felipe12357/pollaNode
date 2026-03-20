import { UserRole } from "../dtos/user";
import { GetSessionUser } from "../utilities/session.storage";

export class ValidationRouteService {

  static validateRoute(): boolean {
    return !!GetSessionUser()
  }

  static validateRouteAdmin(): boolean {
    const sessionUserData = GetSessionUser();
    if(sessionUserData) {
      return sessionUserData.role === UserRole.ADMIN
    }
    return false;
  }

}
