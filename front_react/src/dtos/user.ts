export type UserLoginDto = {
  username: 'string',
  password: 'string',
}

export const UserRole = {
  ADMIN: 'admin',
  NORMAL: 'normal',
}

export type UserLoginRDto = {
  username: string;
  id: number;
  name: string | null;
  lastname: string | null;
  token: string;
  role: typeof UserRole[keyof typeof UserRole];
}