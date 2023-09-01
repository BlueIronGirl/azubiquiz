export interface User {
  username: string;
  password: string;
  id?: number;
  name?: string;
  token?: string;
  admin?: boolean;
}
