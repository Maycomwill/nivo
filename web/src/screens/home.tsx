import ComponentLoading from "@/components/component_loading";
import Logoff from "@/components/logoff";
import Table from "@/components/transaction/table";
import useAuth from "@/hooks/useAuth";
import useLoading from "@/hooks/useLoading";
import useTransaction from "@/hooks/useTransaction";

import { cn } from "cn";
import { useEffect } from "react";

function Home() {
  const { user } = useAuth();
  const { loading } = useLoading();
  const { getAllTransactions, transactions, balance } = useTransaction();
  useEffect(() => {
    if (!user) {
      return;
    }
    getAllTransactions(user.id);
  }, []);
  return (
    <div className="flex w-full flex-1 flex-col items-start justify-start p-4">
      <section className="flex w-full items-center justify-between">
        <p className="capitalize">Olá, {user!.name.slice(0)}</p>
        <Logoff />
      </section>
      Home
      <div className="flex w-full flex-col">
        {loading && <ComponentLoading />}
        <div className="flex flex-col">
          <p className="text-xs">Balanço do mês</p>
          <span className="text-4xl">
            {balance?.balance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </span>

          <div className="mt-4 flex space-x-4">
            <div className="border-aquamarine-300 flex flex-col border-l-2 px-2">
              <p className="text-xs">Entradas</p>
              <span className="text-sm">
                {balance?.incomes.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="border-brilliant-rose-600 flex flex-col border-l-2 px-2">
              <p className="text-xs">Saídas</p>
              <span className="text-sm">
                {balance?.expenses.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>
        <section
          className={cn(
            "relative flex w-full flex-col items-center justify-center",
            loading && "blur-xs",
          )}
        >
          {transactions.length !== 0 && <Table transactions={transactions} />}
        </section>
      </div>
    </div>
  );
}

export default Home;
