export type UserLogin = {
  username: string,
  password: string,
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export type UserSession = {
  username: string;
  role: UserRole;
  token: string;
};

export type UserLoginResponse = {
  username: string;
  id: number;
  name: string | null;
  lastname: string | null;
  token: string;
  role: UserRole;
}