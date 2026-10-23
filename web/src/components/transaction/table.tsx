import {
  Table as UITable,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TransactionProps } from "@/lib/types";
import CategoryIcons from "../category_icons";
import { Edit2 } from "lucide-react";
import { Link } from "react-router";

function Table({ transactions }: { transactions: TransactionProps[] }) {
  return (
    <UITable>
      <TableCaption>Suas movimentações no mês</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cat.</TableHead>
          <TableHead className="w-25">Descrição.</TableHead>
          <TableHead className="text-right">Valor</TableHead>
          <TableHead className="text-right">+</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction: TransactionProps) => {
          return (
            <TableRow key={transaction.id}>
              <TableCell className="w-[5%] place-items-center">
                <CategoryIcons category={transaction.category} />
              </TableCell>
              <TableCell className="font-medium capitalize">
                {transaction.description.length >= 30
                  ? transaction.description.slice(0, 25) + "..."
                  : transaction.description}
              </TableCell>
              <TableCell className="text-right">
                {transaction.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
              <TableCell className="w-[5%] place-items-end xl:w-fit">
                <Link
                  to={`/transaction/${transaction.id}`}
                  className="flex w-full place-items-center items-center justify-end"
                >
                  <Edit2 size={12} />
                </Link>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </UITable>
  );
}

export default Table;
