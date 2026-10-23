import { api } from "@/api/api";
import { TransactionContext } from "@/context/TransactionContext";
import useLoading from "@/hooks/useLoading";
import {
  GetTransactionsResponseSchema,
  TransactionSchema,
} from "@/lib/schemas";
import { useState, type ReactNode } from "react";
import { z } from "zod";

export function TransactionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { handleLoading } = useLoading();
  const [transactions, setTransactions] = useState<
    z.infer<typeof TransactionSchema>[]
  >([]);
  const [transaction, setTransaction] = useState<
    z.infer<typeof TransactionSchema>
  >();
  async function getAllTransactions(id: string) {
    handleLoading(true);
    try {
      const result = await api.get("transaction", {
        params: {
          id,
        },
      });
      if (result.status === 400) {
        handleLoading(false);
        setTransactions([]);
        return;
      }
      console.log(result.data);
      const { data } = GetTransactionsResponseSchema.parse(result.data);
      if (!data) {
        handleLoading(false);
        setTransactions([]);
        return;
      }

      setTransactions(data);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);
        setTransactions([]);
        return handleLoading(false);
      }
      setTransactions([]);
      return handleLoading(false);
    }
  }

  async function getOneTransaction(id: string) {
    handleLoading(true);
    try {
      console.log(id);
      const result = await api.get(
        `/transaction/unique_transaction?transaction_id=${id}`,
      );
      const response = GetTransactionsResponseSchema.parse(result.data);
      console.log(response);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);
        setTransactions([]);
        return handleLoading(false);
      }
      setTransactions([]);
      return handleLoading(false);
    }
  }

  return (
    <TransactionContext.Provider
      value={{ getAllTransactions, getOneTransaction, transactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
