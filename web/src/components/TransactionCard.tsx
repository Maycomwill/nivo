import type { TransactionProps } from "@/lib/types";
import { cn } from "cn";
import { ArrowDown, ArrowUp } from "lucide-react";
import CategoryIcons from "./category_icons";

function TransactionCard({ transaction }: { transaction: TransactionProps }) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-start px-1",
        transaction.operation === "income"
          ? "bg-aquamarine-700"
          : "bg-brilliant-rose-700",
      )}
    >
      <div className="flex w-[25%] items-center justify-start">
        {transaction.operation === "income" ? (
          <ArrowDown size={14} />
        ) : (
          <ArrowUp size={14} />
        )}
        <span className="text-xs">
          {transaction.amount.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
      <div id="spacer" className="mx-1 h-full w-px bg-slate-100/50" />
      <div className="max-w-[70%] w-full">
        <span className="text-xs capitalize">
          {transaction.description.length >= 20
            ? transaction.description.slice(0, 20) + "..."
            : transaction.description}
        </span>
      </div>
      <div id="spacer" className="mx-1 h-full w-px bg-slate-100/50" />
      <div className="flex items-center justify-center w-fit">
        <CategoryIcons category={transaction.category} />
      </div>
    </div>
  );
}

export default TransactionCard;
