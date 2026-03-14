import { UserRole, type UserLoginRDto } from "../dtos/user";

export class ValidationRouteService {

  static validateRoute(): boolean {
    return !!sessionStorage.getItem('user-data')
  }

  static validateRouteAdmin(): boolean {
    const sessionUserDataString = sessionStorage.getItem('user-data');
    if(sessionUserDataString) {
      const sessionUserData = JSON.parse(sessionUserDataString) as UserLoginRDto;
      return sessionUserData.role === UserRole.ADMIN
    }
    return false;
  }

}
