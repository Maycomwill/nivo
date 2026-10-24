import CategoryIcons from "@/components/category_icons";
import ScreenLoading from "@/components/screen_loading";
import { Button } from "@/components/ui/button";
import useLoading from "@/hooks/useLoading";
import useTransaction from "@/hooks/useTransaction";
import { cn } from "cn";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { sleep } from "@/functions/sleep";

function Transaction() {
  const navigate = useNavigate();
  const { loading } = useLoading();
  const { transaction_id } = useParams();
  const { transaction, getOneTransaction, deleteOneTransaction } =
    useTransaction();
  useEffect(() => {
    if (transaction_id === undefined) {
      return;
    }
    getOneTransaction(transaction_id);
  }, []);
  if (
    transaction_id === "" ||
    transaction_id === null ||
    transaction_id === undefined ||
    transaction === undefined
  ) {
    return (
      <>
        {loading && <ScreenLoading />}
        <div
          className={cn(
            "flex w-full flex-1 flex-col items-center justify-start space-y-4 pt-24",
            loading && "blur-xs",
          )}
        >
          <span className="text-2xl">Id da transação inválido.</span>
          <Link to="/">
            <Button size={"lg"}>Voltar</Button>
          </Link>
        </div>
      </>
    );
  }

  async function handleDelete(id: string) {
    deleteOneTransaction(id);
    await sleep(2000);
    navigate("/");
  }

  return (
    <div className="flex w-full flex-1 flex-col items-start justify-center">
      {loading && <ScreenLoading />}
      <div
        className={cn(
          "flex w-full flex-1 flex-col items-start justify-start pt-4",
          loading && "blur-xs",
        )}
      >
        <div
          id="header"
          className="mb-4 grid w-full grid-cols-3 items-center px-4 text-center"
        >
          <Button variant={"ghost"} size={"icon"} onClick={() => navigate("/")}>
            <ArrowLeft />
          </Button>
          <h1>Transação</h1>
          <div />
        </div>
        <div
          id="body"
          className="animate-page-up relative flex w-full flex-1 flex-col rounded-t-3xl bg-slate-900/90 p-8"
        >
          <div className="absolute top-4 left-1/2 h-1 w-1/3 -translate-x-1/2 rounded-full bg-slate-800/50" />
          <span
            className={cn(
              "text-5xl font-bold tracking-wider",
              transaction.operation === "income"
                ? "text-green-400"
                : "text-red-400",
            )}
          >
            {transaction.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>

          <div className="space-y-2">
            <p className="text-lg text-slate-50/80 capitalize">
              {transaction.description}
            </p>

            <p className="flex items-center justify-start gap-1 text-lg text-slate-50/80">
              Categoria:
              <span>
                {CategoryIcons({ category: transaction.category, size: 16 })}
              </span>
            </p>
            <p className="text-lg text-slate-50/80">
              {format(transaction.date, "dd/MM/yyyy", { locale: ptBR })}
            </p>
            <p className="text-lg text-slate-50/80">
              Custo fixo: {transaction.fixed ? "Sim" : "Não"}
            </p>
          </div>
          <div className="mt-2 flex w-full items-center justify-center">
            <Button
              onClick={() => {
                handleDelete(transaction.id);
              }}
              variant={"destructive"}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
