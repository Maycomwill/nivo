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
import { Link, useSearchParams } from "react-router";

function Table({ transactions }: { transactions: TransactionProps[] }) {
  const [searchParams] = useSearchParams();
  const searchMonth = searchParams.get("month");
  const searchYear = searchParams.get("year");
  let month = searchMonth;
  if (month === "1") {
    month = "janeiro";
  } else if (month === "2") {
    month = "fevereiro";
  } else if (month === "3") {
    month = "março";
  } else if (month === "4") {
    month = "abril";
  } else if (month === "5") {
    month = "maio";
  } else if (month === "6") {
    month = "junho";
  } else if (month === "7") {
    month = "julho";
  } else if (month === "8") {
    month = "agosto";
  } else if (month === "9") {
    month = "setembro";
  } else if (month === "10") {
    month = "outubro";
  } else if (month === "11") {
    month = "novembro";
  } else if (month === "12") {
    month = "dezembro";
  }
  return (
    <UITable>
      <TableCaption>
        Suas movimentações no mês de {month}{searchYear && "/"+searchYear.slice(2, 4)}
      </TableCaption>
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
