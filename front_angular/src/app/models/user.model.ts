export type UserLogin = {
  username: string,
  password: string,
}

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export type UserSession = {
  username: string;
  role: string;
  token: string;
};

export type UserLoginResponse = {
  username: string;
  id: number;
  name: string | null;
  lastname: string | null;
  token: string;
  role: typeof UserRole[keyof typeof UserRole];
}