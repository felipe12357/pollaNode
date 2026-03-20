export type UserLoginDto = {
  username: 'string',
  password: 'string',
}

export const UserRole = {
  ADMIN: 'ADMIN',
  USER: 'USER',
}

export type UserLoginRDto = {
  username: string;
  id: number;
  name: string | null;
  lastname: string | null;
  token: string;
  role: typeof UserRole[keyof typeof UserRole];
}

export type UserData = Omit<UserLoginRDto, 'token'>;