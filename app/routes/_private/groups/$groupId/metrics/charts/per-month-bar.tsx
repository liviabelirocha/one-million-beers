import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";

const beersPerMonthChartConfig = {
  total_amount: {
    label: "Total Beers",
    color: "#2563eb",
  },
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChartPerMonthBar = ({ data }: { data: any }) => (
  <Card className="flex flex-col w-full">
    <CardHeader className="items-center pb-0">
      <CardTitle>Beers per Month</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 pb-0 justify-center">
      <ChartContainer
        config={beersPerMonthChartConfig}
        className="h-[200px] w-full"
      >
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" tickLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="total_amount"
            fill="var(--color-total_amount)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);
