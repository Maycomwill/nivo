import { api } from "@/api/api";
import { TransactionContext } from "@/context/TransactionContext";
import { sleep } from "@/functions/sleep";
import useLoading from "@/hooks/useLoading";
import {
  AddTransactionResponseSchema,
  GetTransactionsResponseSchema,
  TransactionSchema,
} from "@/lib/schemas";
import type {
  AddTransactionProps,
  BalanceProps,
  CategoriesChartProps,
  TransactionProps,
} from "@/lib/types";
import { useState, type ReactNode } from "react";
import { z } from "zod";
import * as XLSX from "xlsx";

export function TransactionContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { handleLoading } = useLoading();
  const [balance, setBalance] = useState<BalanceProps>();
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
    const data_to_chart: CategoriesChartProps[] = Object.values(
      transactions.reduce<Record<string, CategoriesChartProps>>(
        (acc, transaction) => {
          const key = `${transaction.category}-${transaction.operation}`;

          if (!acc[key]) {
            acc[key] = {
              category: transaction.category,
              transactions: [],
              operation: transaction.operation,
              total_amount: 0,
            };
          }

          acc[key].transactions.push(transaction);
          acc[key].total_amount += transaction.amount;

          return acc;
        },
        {},
      ),
    ).sort((a, b) => a.total_amount - b.total_amount);

    return setBalance({
      balance,
      expenses,
      incomes,
      data_to_balance_chart: data_to_chart,
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
  async function getAllTransactionsFromOneMonth(
    id: string,
    month: string | null,
    year: string | null,
  ) {
    handleLoading(true);
    let newMonth;
    let newYear;
    if (month === null || year === null) {
      const date = new Date();
      newMonth = date.getMonth() + 1;
      newYear = date.getFullYear();
    } else {
      newMonth = month;
      newYear = year;
    }
    try {
      const result = await api.get("transaction/month", {
        params: {
          id,
          month: Number(newMonth),
          year: Number(newYear),
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
      const converted_date = new Date(
        data.date.getFullYear(),
        data.date.getMonth(),
        data.date.getDate(),
        12,
        0,
        0,
      );

      // console.log(converted_date);
      const result = await api.post("/transaction/create", {
        description: data.description,
        amount: converted_amout,
        category: data.category,
        operation: data.operation,
        date: converted_date,
        fixed: data.fixed,
        owner_id: user_id,
      });
      if (result.status === 400) {
        return handleLoading(false);
      }
      const response = AddTransactionResponseSchema.parse(result.data);
      console.log(response.message);
      return handleLoading(false);
    } catch (error) {
      if (error instanceof z.ZodError || error instanceof Error) {
        console.log(error);

        return handleLoading(false);
      }

      return handleLoading(false);
    }
  }

  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  async function createXLSXFile() {
    const new_transactions = transactions.map(
      (transaction: TransactionProps) => {
        return {
          data: transaction.date,
          movimentação:
            transaction.operation === "income" ? "Entrada" : "Saída",
          categoria: capitalizeFirstLetter(transaction.category),
          descrição: transaction.description,
          valor:
            transaction.operation === "income"
              ? transaction.amount
              : -transaction.amount,
          fixo: transaction.fixed ? "Sim" : "Não",
        };
      },
    );
    const worksheet = XLSX.utils.json_to_sheet(new_transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
    XLSX.writeFile(workbook, "transactions.xlsx", { compression: true });
    console.log("createXLSXFile called");
    return;
  }

  return (
    <TransactionContext.Provider
      value={{
        getAllTransactionsFromOneMonth,
        getAllTransactions,
        getOneTransaction,
        deleteOneTransaction,
        addTransaction,
        createXLSXFile,
        transactions,
        transaction,
        balance,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
