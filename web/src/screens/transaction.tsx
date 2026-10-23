import { Button } from "@/components/ui/button";
import useTransaction from "@/hooks/useTransaction";
import { useEffect } from "react";
import { Link, useParams } from "react-router";

function Transaction() {
  const { transaction_id } = useParams();
  const { transactions, getOneTransaction } = useTransaction();
  useEffect(() => {
    if (transaction_id === undefined) {
      return;
    }
    getOneTransaction(transaction_id);
  }, []);
  if (
    transaction_id === "" ||
    transaction_id === null ||
    transaction_id === undefined
  ) {
    return (
      <div>
        <span>id da transação inválido.</span>
        <Link to="/">
          <Button>Voltar</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      Transaction
      <span>{transaction_id}</span>
    </div>
  );
}

export default Transaction;
