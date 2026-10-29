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

export interface CategoriesChartProps {
  category: string;
  transactions: TransactionProps[];
  operation: "expense" | "income";
  total_amount: number;
}

export interface BalanceProps {
  balance: number;
  incomes: number;
  expenses: number;
  data_to_balance_chart: CategoriesChartProps[];
}

export interface AddTransactionProps {
  amount: string;
  category:
    | "salário"
    | "contas"
    | "investimentos"
    | "cartão"
    | "alimentação"
    | "compras"
    | "carro"
    | "moto"
    | "outros"
    | "financiamento";
  description: string;
  date: Date;
  operation: "expense" | "income";
  fixed: boolean;
}
