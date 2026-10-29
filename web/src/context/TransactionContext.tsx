import { TransactionSchema } from "@/lib/schemas";
import type { AddTransactionProps, BalanceProps } from "@/lib/types";
import { createContext } from "react";
import type { z } from "zod";

export interface TransactionContextProps {
  transactions: z.infer<typeof TransactionSchema>[];
  transaction: z.infer<typeof TransactionSchema> | undefined;
  balance: BalanceProps | undefined;
  getAllTransactions: (id: string) => void;
  getAllTransactionsFromOneMonth: (
    id: string,
    month: string | null,
    year: string | null,
  ) => void;
  getOneTransaction: (transaction_id: string) => void;
  deleteOneTransaction: (id: string) => void;
  addTransaction: (data: AddTransactionProps) => Promise<void>;
}

export const TransactionContext = createContext({} as TransactionContextProps);
