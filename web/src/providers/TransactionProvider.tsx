import { api } from "@/api/api";
import { TransactionContext } from "@/context/TransactionContext";
import { sleep } from "@/functions/sleep";
import useLoading from "@/hooks/useLoading";
import {
  AddTransactionResponseSchema,
  BalanceSchema,
  GetTransactionsResponseSchema,
  TransactionSchema,
} from "@/lib/schemas";
import type { AddTransactionProps, TransactionProps } from "@/lib/types";
import { useState, type ReactNode } from "react";
import { z } from "zod";

export function TransactionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { handleLoading } = useLoading();
  const [balance, setBalance] = useState<z.infer<typeof BalanceSchema>>();
  const [transactions, setTransactions] = useState<
    z.infer<typeof TransactionSchema>[]
  >([]);
  const [transaction, setTransaction] =
    useState<z.infer<typeof TransactionSchema>>();

  function handleBalance({
    transactions,
  }: {
    transactions: TransactionProps[];
  }) {
    const incomes_raw = transactions.filter((transaction: TransactionProps) => {
      return transaction.operation === "income";
    });
    const expenses_raw = transactions.filter(
      (transaction: TransactionProps) => {
        return transaction.operation === "expense";
      },
    );

    const incomes = incomes_raw.reduce(
      (acc, income: TransactionProps) => acc + income.amount,
      0,
    );
    const expenses = expenses_raw.reduce(
      (acc, expense: TransactionProps) => acc + expense.amount,
      0,
    );

    const balance = incomes - expenses;

    return setBalance({
      balance,
      expenses,
      incomes,
    });
  }
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
      // console.log(result.data);
      const { data } = GetTransactionsResponseSchema.parse(result.data);
      if (!data) {
        handleLoading(false);
        setTransactions([]);
        return;
      }

      setTransactions(data);

      handleBalance({ transactions: data });

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
      // console.log(id);
      const result = await api.get(
        `/transaction/unique_transaction?transaction_id=${id}`,
      );
      const response = GetTransactionsResponseSchema.parse(result.data);
      console.log(response);
      setTransaction(response.data[0]);
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

  async function deleteOneTransaction(id: string) {
    handleLoading(true);
    try {
      const result = await api.delete("transaction", {
        data: {
          transaction_id: id,
        },
      });
      if (result.status === 400) {
        await sleep(2000);
        return handleLoading(false);
      }
      await sleep(2000);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);

        return handleLoading(false);
      }

      return handleLoading(false);
    }
  }

  async function addTransaction(data: AddTransactionProps) {
    handleLoading(true);
    try {
      const user_id = localStorage.getItem("user_id");
      console.log(user_id);
      const converted_amout = Number(data.amount);
      console.log(data, converted_amout);
      const result = await api.post("/transaction/create", {
        description: data.description,
        amount: converted_amout,
        category: data.category,
        operation: data.operation,
        date: data.date.toDateString(),
        fixed: data.fixed,
        owner_id: user_id,
      });
      if (result.status === 400) {
        return handleLoading(false);
      }
      const response = AddTransactionResponseSchema.parse(result.data);
      console.log(response.message);
      await sleep(2000);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);

        return handleLoading(false);
      }

      return handleLoading(false);
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        getAllTransactions,
        getOneTransaction,
        deleteOneTransaction,
        addTransaction,
        transactions,
        transaction,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
