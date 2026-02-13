import { UserRole } from "../dtos/user";

export class ValidationRouteService {

  static validateRoute(): boolean {
    return !!sessionStorage.getItem('user-token')
  }

  static validateRouteAdmin(): boolean {
    return sessionStorage.getItem('user-role') == UserRole.ADMIN;
  }

}
