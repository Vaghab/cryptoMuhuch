export type themes = 'light' | 'dark';

export interface UserData {
  name: string;
  surname: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface User extends UserData {
  id: number;
}

export interface LoginUser {
  login: string;
  password: string;
}
