export interface User {
  name: string;
  email: string;
  id: string;
}

export interface UserLogin {
  email: string;
  password: string;
  remember: boolean;
}
