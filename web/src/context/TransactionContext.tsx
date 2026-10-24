import { BalanceSchema, TransactionSchema } from "@/lib/schemas";
import { createContext } from "react";
import type { z } from "zod";

export interface TransactionContextProps {
  getAllTransactions: (id: string) => void;
  transactions: z.infer<typeof TransactionSchema>[];
  transaction: z.infer<typeof TransactionSchema> | undefined;
  balance: z.infer<typeof BalanceSchema> | undefined;
  getOneTransaction: (transaction_id: string) => void;
  deleteOneTransaction: (id: string) => void;
}

export const TransactionContext = createContext({} as TransactionContextProps);
