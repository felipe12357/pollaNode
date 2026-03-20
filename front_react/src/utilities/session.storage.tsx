import type { UserLoginRDto } from "../dtos/user";

export const GetSessionUser = (): UserLoginRDto | null => {
  const sessionUserDataString = sessionStorage.getItem('user-data');

  if(sessionUserDataString) {
    const sessionUserData = JSON.parse(sessionUserDataString) as UserLoginRDto;
    return sessionUserData;
  }

  return null;
}
