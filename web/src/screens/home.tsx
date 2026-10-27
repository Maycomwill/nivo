import ComponentLoading from "@/components/component_loading";
import Logoff from "@/components/logoff";
import Table from "@/components/transaction/table";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import useLoading from "@/hooks/useLoading";
import useTransaction from "@/hooks/useTransaction";

import { cn } from "cn";
import { PlusCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import HomeFilter from "@/components/popover/home_filter";

function Home() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const { loading } = useLoading();
  const { getAllTransactionsFromOneMonth, transactions, balance } =
    useTransaction();
  useEffect(() => {
    if (!user) {
      setParams();
      return;
    }
    getAllTransactionsFromOneMonth(
      user.id,
      params.get("month"),
      params.get("year"),
    );
  }, [params]);
  return (
    <div className="flex w-full flex-1 flex-col items-start justify-start p-4">
      <section className="flex w-full items-center justify-between">
        <p className="capitalize">Olá, {user!.name.slice(0)}</p>
        <Logoff />
      </section>
      <div className="flex flex-1 relative w-full flex-col">
        {loading && (
          <div className="flex h-full absolute w-full items-center justify-center">
            <ComponentLoading />
          </div>
        )}

        <div className={cn("flex flex-col", loading && "blur-xs")}>
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
            <div className="flex flex-1 items-center justify-end">
              <HomeFilter />
              <Button
                size={"icon-xl"}
                variant={"ghost"}
                className="rounded-full"
              >
                <Link className="flex items-center justify-center" to={"/add"}>
                  <PlusCircleIcon className="size-7" color="#60f3af" />
                </Link>
              </Button>
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
