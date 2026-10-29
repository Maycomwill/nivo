import type { CategoriesChartProps } from "@/lib/types";
import { Pie, PieChart, Sector, type PieSectorShapeProps } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

function ExpensesChart({
  transactions,
}: {
  transactions: CategoriesChartProps[] | undefined;
}) {
  if (transactions === undefined) {
    return;
  }

  const chartData = transactions
    .filter((item) => item.operation === "expense")
    .map((item, index) => ({
      category: item.category,
      amount: item.total_amount,
      fill: `var(--chart-${(index % 5) + 1})`,
    }));

  const chartConfig = {
    amount: {
      label: "Valor",
    },

    ...Object.fromEntries(
      chartData.map((item, index) => [
        item.category,
        {
          label: item.category,
          color: `var(--chart-${(index % 5) + 1})`,
        },
      ]),
    ),
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-62.5 w-full"
    >
      <PieChart>
        <ChartTooltip
          formatter={(value, name) => (
            <>
              <span className="capitalize">{name}</span>
              <span className="ml-auto font-mono font-medium tabular-nums">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(value))}
              </span>
            </>
          )}
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="amount"
          nameKey="category"
          innerRadius={60}
          
        />
      </PieChart>
    </ChartContainer>
  );
}

export default ExpensesChart;
