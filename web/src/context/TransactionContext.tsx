import { TransactionSchema } from "@/lib/schemas";
import { createContext } from "react";
import type { z } from "zod";

export interface TransactionContextProps {
  getAllTransactions: (id: string) => void;
  transactions: z.infer<typeof TransactionSchema>[];
  getOneTransaction: (transaction_id: string) => void;
}

export const TransactionContext = createContext({} as TransactionContextProps);
