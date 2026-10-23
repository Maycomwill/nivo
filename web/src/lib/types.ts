export interface User {
  name: string;
  email: string;
  id: string;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface TransactionProps {
  id: string;
  amount: number;
  category: string;
  owner_id: string;
  description: string;
  date: Date;
  operation: "expense" | "income";
  fixed: boolean;
}
