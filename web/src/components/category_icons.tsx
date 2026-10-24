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
function CategoryIcons({
  category,
  size = 14,
}: {
  category: string;
  size?: number;
}) {
  if (category === "contas") {
    return <ReceiptIcon size={size} />;
  } else if (category === "carro") {
    return <CarIcon size={size} />;
  } else if (category === "moto") {
    return <MotorbikeIcon size={size} />;
  } else if (category === "alimentação") {
    return <UtensilsIcon size={size} />;
  } else if (category === "compras") {
    return <ShoppingBagIcon size={size} />;
  } else if (category === "cartão") {
    return <CreditCardIcon size={size} />;
  } else if (category === "investimentos") {
    return <PiggyBankIcon size={size} />;
  } else if (category === "salário") {
    return <CoinsIcon size={size} />;
  }

  return <BlocksIcon size={size} />;
}

export default CategoryIcons;
