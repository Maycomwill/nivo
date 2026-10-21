import { useContext } from "react";
import {
  TransactionContext,
  type TransactionContextProps,
} from "@/context/TransactionContext";

export default function useTransaction(): TransactionContextProps {
  const context = useContext(TransactionContext);
  return context;
}
