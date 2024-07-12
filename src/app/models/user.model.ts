export interface User {
  id: number;
  name: string;
  lastName: string;
  userId: string;
  password: string;
  role: 'ADMIN' | 'EMPLOYED';
  state: boolean;
  token: string;
}
