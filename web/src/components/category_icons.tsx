import {
  ReceiptIcon,
  CarIcon,
  MotorbikeIcon,
  UtensilsIcon,
  ShoppingBagIcon,
  CreditCardIcon,
  PiggyBankIcon,
  CoinsIcon,
  BlocksIcon,
} from "lucide-react";
function CategoryIcons({ category }: { category: string }) {
  if (category === "contas") {
    return <ReceiptIcon size={14} />;
  } else if (category === "carro") {
    return <CarIcon size={14} />;
  } else if (category === "moto") {
    return <MotorbikeIcon size={14} />;
  } else if (category === "alimentação") {
    return <UtensilsIcon size={14} />;
  } else if (category === "compras") {
    return <ShoppingBagIcon size={14} />;
  } else if (category === "cartão") {
    return <CreditCardIcon size={14} />;
  } else if (category === "investimentos") {
    return <PiggyBankIcon size={14} />;
  } else if (category === "salário") {
    return <CoinsIcon size={14} />;
  }

  return <BlocksIcon size={14} />;
}

export default CategoryIcons;
